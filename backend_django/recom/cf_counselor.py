import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 협업 필터링 아이템 기반


def cf_item_based_counselor(member_id, counselor_data, review_data):
    # 데이터 전처리
    counselor_data = dropCounselor(counselor_data)
    review_data = dropReview(review_data)
    print(review_data)

    # 두 데이터 하나로 합치기
    user_counselor_rating = pd.merge(
        review_data, counselor_data, left_on='counselor', right_on='id', how='inner')
    # print(user_counselor_rating)

    # 상담사 리뷰 작성 회원으로 x,y 설정하고, 데이터는 평점으로 설정 후 빈칸 0으로 채우기
    counselor_user_rating = user_counselor_rating.pivot_table(
        'score', index='member', columns='counselor')
    # print(counselor_user_rating)
    counselor_user_rating.fillna(0, inplace=True)
    # print(counselor_user_rating)

    # 아이템-사용자 행렬 데이터
    counselor_user_rating_T = counselor_user_rating.transpose()
    # print(counselor_user_rating_T)

    # 코사인 유사도 구하고 데이터 프레임으로 변경
    item_based_collabor = cosine_similarity(
        counselor_user_rating_T, counselor_user_rating_T)
    # print(item_based_collabor)

    # cosine_similarity()로 반환된 넘파이 행렬을 상담사명으로 매핑하여 DataFrame으로 변환
    item_sim_df = pd.DataFrame(
        data=item_based_collabor, index=counselor_user_rating.columns, columns=counselor_user_rating.columns)

    # 상담사 간 유사도 산출
    # print(item_sim_df[1].sort_values(ascending=False)[1:4])

    # 아이템 기반 인접 이웃 협업 필터링으로 개인화된 상담사 추천 (가중평점합 기반)
    ratings_pred = predict_rating(
        counselor_user_rating.values, item_sim_df.values)
    ratings_pred_matrix = pd.DataFrame(
        data=ratings_pred, index=counselor_user_rating.index, columns=counselor_user_rating.columns)
    # print(ratings_pred_matrix)

    # top-n 유사도를 가진 데이터들에 대한 예측 평점
    # ratings_pred = predict_rating_topsim(
    #     counselor_user_rating.values, item_sim_df.values, 3)
    # user_rating_id = counselor_user_rating.loc[member_id, :]
    # user_rating_id[user_rating_id > 0].sort_values(ascending=False)[:]

    # 사용자가 상담하지 않은 상담사명 추출
    uncounsel_list = get_uncounsel_counselor(counselor_user_rating, member_id)
    # print(uncounsel_list)

    # 아이템 기반의 인접 이웃 협업 필터링으로 상담사 추천
    recomm_counselor = recomm_counselor_by_memberid(
        ratings_pred_matrix, member_id, uncounsel_list, 5)
    # print(recomm_counselor)

    # 평점 데이터를 DataFrame으로 생성
    recomm_counselor = pd.DataFrame(
        data=recomm_counselor.values, index=recomm_counselor.index, columns=['pred_score'])
    # print(recomm_counselor)
    return recomm_counselor

    # 최근 좋아했던 상담사와 비슷한 성향의 상담사 추천
    # 태그를 활용하지 않아서 활용해야할듯
    # return item_based_collabor['counselor_id'].sort_values(ascending=False)[1:4]


# Weighted Rating Sum (행렬 연산, 내적)
def predict_rating(ratings_arr, item_sim_arr):
    ratings_pred = ratings_arr.dot(
        item_sim_arr) / np.array([np.abs(item_sim_arr).sum(axis=1)])
    return ratings_pred

# top-n 유사도를 가진 데이터들에 대해서 예측 평점 계산
def predict_rating_topsim(ratings_arr, item_sim_arr, n):
    # 사용자-아이템 평점 행렬 크기만큼 0으로 채운 예측 행렬 초기화
    pred = np.zeros(ratings_arr.shape)

    # 사용자-아이템 평점 행렬의 열 크기만큼 Loop 수행
    for col in range(ratings_arr.shape[1]):
        # 유사도 행렬에서 유사도가 큰 순으로 n개 데이터 행렬의 index 반환
        top_n_items = [np.argsort(item_sim_arr[:, col])[:-n-1:-1]]
        # 개인화된 예측 평점을 계산
        for row in range(ratings_arr.shape[0]):
            pred[row, col] = item_sim_arr[col, :][top_n_items].dot(
                ratings_arr[row, :][top_n_items].T)
            pred[row, col] /= np.sum(np.abs(item_sim_arr[col, :][top_n_items]))
    return pred

# 사용자가 상담하지 않은 상담사 중에서 아이템 기반의 인접 이웃 협업 필터링으로 상담사 추천
def get_uncounsel_counselor(ratings_matrix, memberId):
    # memberId로 입력받은 사용자의 모든 상담사정보 추출하여 Seried로 반환
    # 반환된 user_rating은 상담사명(counselor)을 index로 가지는 Seried 객체
    user_rating = ratings_matrix.loc[memberId, :]

    # user_rating이 0보다 크면 기존에 상담한 상담사임. 대상 index를 추출하여 list 객체로 만듬
    already_counsel = user_rating[user_rating > 0].index.tolist()

    # 모든 상담사명을 list 객체로 만듬
    counselors_list = ratings_matrix.columns.tolist()

    # list comprehension으로 already_counsel에 해당하는 counselor는 counselors_list에서 제외함
    uncounsel_list = [
        counselor for counselor in counselors_list if counselor not in already_counsel]

    return uncounsel_list

# 사용자가 상담하지 않은 상담사들 중 예측 평점이 가장 높은 상담사를 추천
def recomm_counselor_by_memberid(pred_df, memberId, uncounsel_list, top_n):
    # 예측 평점 DataFrame에서 사용자id index와 uncounsel_list로 들어온 상담사명 컬럼을 추출하여
    # 가장 예측 평점이 높은 순으로 정렬
    recomm_counselors = pred_df.loc[memberId, uncounsel_list].sort_values(
        ascending=False)[:top_n]
    return recomm_counselors

# 상담사 데이터 프레임 필요없는 데이터 삭제
def dropCounselor(df):
    df.drop('email', axis=1, inplace=True)
    df.drop('password', axis=1, inplace=True)
    # df.drop('name', axis=1, inplace=True)
    df.drop('available_time', axis=1, inplace=True)
    df.drop('certificate', axis=1, inplace=True)
    df.drop('career', axis=1, inplace=True)
    df.drop('explanation', axis=1, inplace=True)
    df.drop('gender', axis=1, inplace=True)
    return df

# 상담사 리뷰 데이터 프레임에 필요없는 데이터 삭제 및 변수 타입 변경
def dropReview(df):
    df.drop('content', axis=1, inplace=True)
    df.drop('reg_date', axis=1, inplace=True)
    df.drop('id', axis=1, inplace=True)
    df['counselor'] = df['counselor'].astype(int)
    df['member'] = df['member'].astype(int)
    return df
