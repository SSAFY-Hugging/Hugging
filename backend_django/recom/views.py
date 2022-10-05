from django_pandas.io import read_frame

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Counselor, CounselorReview, Member, MemberMentalCategory, MusicReview, Music
from .serializers import CounselorSerializer, MusicSerializer

from .cf_counselor import cf_item_based_counselor as cf
from .coldstart_counselor import recom_coldstart_counselor as cs
from.cf_music import cf_music, music_tag

import numpy as np
# Create your views here.


class CounselorRecomAPI(APIView):

    # DB에 2번 접근하는중
    # 리팩토링 예정
    @api_view(['GET', ])
    def get(self, member_id):
        # 상담사 데이터는 변하지 않을것이므로 CSV 등으로 가지고 있는것이 좋아보임 수정 예정
        queryset = Counselor.objects.all()
        # print(list(queryset))
        counselorDf = read_frame(queryset)
        # member = CounselorReview.objects.filter(member__id=member_id)
        # print(member)
        if CounselorReview.objects.filter(member__id = member_id):
            reviewDf = read_frame(CounselorReview.objects.all())
            cf_list = cf(member_id, counselorDf, reviewDf)
            # cf_list = list(map(int, cf_list))
            print(cf_list)

            resultset = Counselor.objects.filter(id__in=cf_list.index)

            print(resultset)

            serializer = CounselorSerializer(resultset, many=True)
            return Response(serializer.data)
        else:
            member_category = MemberMentalCategory.objects.filter(member__id = member_id).values()
            # print(member_category)
            result = cs(member_category)
            return Response(result)

class MusicRecomAPI(APIView):

    @api_view(['GET',])
    def get(self, member_id):
        music_reviews = read_frame(MusicReview.objects.all())
        is_new_member, recommend_music = cf_music(member_id, music_reviews)
        if(is_new_member):
            mental = MemberMentalCategory.objects.filter(id=member_id)
            member_mentality = music_tag(mental.values())
            queryset = Music.objects.filter(category__in=member_mentality).order_by('hits')[:5]
            # print(queryset)
            serializer = MusicSerializer(queryset, many=True)
        else:
            queryset = Music.objects.filter(id__in=recommend_music)
            # print(queryset)
            serializer = MusicSerializer(queryset, many=True)

        data = serializer.data[:]
        return Response(data)

