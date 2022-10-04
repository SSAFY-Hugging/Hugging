import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds

def cf_music(member_id, music_review):
    # 불필요한 컬럼 제거
    # music_info = preceed_music_info(music_info)

    # 리뷰 데이터 2차원 DataFrame으로 변경
    user_music_rating = music_review.pivot(values = 'score', index = 'member', columns = 'music').fillna(0)

    # DataFrame -> Array
    matrix = user_music_rating.values

    # 음악에 대한 회원의 리뷰 평균 구하기
    user_rating_mean = np.mean(matrix, axis = 1)

    # 리뷰 평균 점수에서 빼기
    matrix_user_mean = matrix - user_rating_mean.reshape(-1,1)

    # 행렬 분해
    U, sigma, Vt = svds(matrix_user_mean, k = 5)

    # 대칭행렬로 변경
    sigma = np.diag(sigma)

    # 내적 수행을 통해 원본 행렬로 변환
    svd_user_music_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1,1)

    # DataFrame으로 변환
    df_svd_preds = pd.DataFrame(svd_user_music_predicted_ratings, columns = user_music_rating.columns)

    return recommend_music(df_svd_preds, member_id, music_review)


def recommend_music(df_svd_preds, user_id, df_music_reviews, num_recommendations = 5):
    
    # 인덱스이므로 id-1
    user_rows = user_id - 1

    # 최종적으로 만든 pred_df에서 사용자 index에 따라 음악 데이터 정렬 -> 음악 평점이 높은 순으로 정렬
    sorted_user_predictions = df_svd_preds.iloc[user_rows].sort_values(ascending = False)
    
    # 원본 평점 데이터에서 user_id 에 해당하는 데이터를 뽑아냄
    user_data = df_music_reviews[df_music_reviews.member == user_id]
    
    # 위에서 뽑은 user_data와 원본 음악 데이터를 합친다
    user_history = user_data.sort_values(['score'], ascending = False)
    
    # 이미 들었던 음악은 제거
    predictions = pd.DataFrame(sorted_user_predictions).reset_index()
    predictions = predictions[~predictions['music'].isin(user_history['music'])]

    # num_recommendations개의 music_id로 배열 생성
    recom = []
    for i in range(num_recommendations):
        recom.append(predictions.values[i][0])
    
    return recom
