<div align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/60915285/195415262-2872bdb3-7974-4163-9df4-40c3ee2184b0.png" width="25%" />
  <br />
</div>

<div align="center">
 <h3><b>Hugging 🤗</b></h3>
언택트 마음챙김 웹서비스<br><br>
  삼성 청년 SW 아카데미 특화 프로젝트<br>
  2022.09.29 ~ 2022.10.07
  <br><br>

  [Notion](https://denim-beechnut-408.notion.site/Hugging-6a51d8c22b494978ae2626b962e9266d)  |  [UCC](https://youtu.be/WbSxhAURWtE)
</div>
<br/>


## 서비스 배경 💡

건강보험심사평가원 통계에 따르면 5년간 우울증 환자 수는 지속적인 증가 추세에 있습니다.<br>
특히, 최근 코로나19의 확산으로 일상에 큰 변화가 생기면서 우울감과 무기력증이 늘었습니다.<br>
이러한 이유들로, 지친 마음을 위로해주어 일상에 활기를 불어넣는 마음챙김 서비스를 생각하였습니다.<br>

<br><br>

## 개발환경 및 기술 스택 🔨

### FE
`HTML`<br>
`CSS` <br>
`Javascript`<br>
`Node.js 16.16.0`<br>
`React 18.2.0`

  ```
  ├─myApp
  │  ├─public
  │  │  └─assets
  │  │      └─icon
  │  └─src
  │      ├─components
  │      ├─pages
  │      └─theme
  ├─public
  └─src
      ├─components
      │  ├─counsel
      │  ├─counselor
      │  ├─main
      │  ├─media
      │  ├─mission
      │  └─ui
      ├─config
      ├─fonts
      ├─helpers
      ├─img
      ├─Layout
      ├─lib
      ├─pages
      │  ├─counsel
      │  ├─counselor
      │  ├─main
      │  ├─media
      │  ├─mission
      │  └─user
      ├─store
      ├─styles
      └─styles2
  
  ```

  

### BE
`Java 8`<br>
`Python`<br>
`Spring Boot 2.7.2`<br>
`Django`<br>
`Gradle` <br>
`JPA`<br>
`MySQL`<br>
`Swagger2 3.0.0`<br>


### Metaverse
`Unity`<br>
`C#`<br>
`WebGL`<br>
`Photon PUN2`<br>
`Agora Real-Time Voice`<br>


### CI/CD
`AWS`<br>
`Ubuntu`<br>
`Docker`<br>
`Jenkins`<br>
`Nginx`<br>


### 버전/이슈 관리
`Jira`<br>
`GitLab`<br>
`Sourcetree`<br>

### TOOL
`Postman`<br>
`Figma`<br>

### 협업
`Cisco Webex Meetings`<br>
`Mattermost`<br>
`Notion`<br>

### IDE
`Visual Studio Code`<br>
`Visual Studio`<br>
`IntelliJ`<br>
<br>


## 서비스 구조도 🔍
<img src="https://user-images.githubusercontent.com/60915285/195417654-f548e9c9-82cb-4240-80f2-ab9fadacff37.png" width="700">



## 주요 기능 📚

### 로그인 및 회원가입<br>
![signup](https://user-images.githubusercontent.com/60915285/204676700-cac2ade1-6d1c-4a37-a226-edf13706b6bd.gif)
- 감정 카테고리를 바탕으로 음악 추천 서비스가 제공되므로 회원가입 시 사용자의 감정을 받습니다.

- 전문가 상담 기능이 제공되기 때문에 카카오 소셜 로그인을 통해 인증된 사용자가 서비스를 이용할 수 있도록 했습니다.

  <br>
  
  <br>

### 메인페이지 / 감정별 음악 추천 기능<br>

![emotion](https://user-images.githubusercontent.com/60915285/204676827-4448c674-ac15-44e5-8f17-3be86e8c16c3.gif)

- 감정 버튼을 누르면 감정에 따른 음악을 추천 받을 수 있습니다.

  <br>

  <br>

### ASMR / 음악 빅데이터 추천 서비스<br>

![music](https://user-images.githubusercontent.com/60915285/204676850-cd73ec47-92a8-4fe5-acfe-f451e728294a.gif)

<br>



### 메타버스 상담 서비스<br>
<img width="600" alt="스크린샷 2022-10-13 오전 3 27 24" src="https://user-images.githubusercontent.com/60915285/195420529-131b7a0a-c5ed-4e66-aeac-b976760e5b15.png" />
<br>


![unity](https://user-images.githubusercontent.com/60915285/204677405-a0509bb9-b76a-4e3e-bdf0-b397b181b74a.gif)<br>
- 메타버스 상담 서비스는 대면 상담을 어려워하고 꺼려하는 사람들이 상담에 대한 거부감을 낮추기 위해 기획하였습니다. 

- 1:1 상담 및 커뮤니티 상담으로 나누어져있습니다. 1:1 상담은 예약을 통해 상담사와 둘이서 진행을 하고, 커뮤니티 상담은 원하는 주제 방을 선택하여 들어갈 수 있습니다.

- 상담방에서는 방 정보(방 인원, 인원 목록)를 볼 수 있으며 음성채팅 기능, 감정표현 기능이 있습니다.

- 상담방은 상담 주제에 맞춰 BGM/ASMR과 장소가 정해집니다.

- 메타버스 상담 서비스는 Unity로 구현하였고, 멀티서버는 Photon, 음성채팅은 Agora 기술을 사용하였습니다.
  <br><br>
  

### 상담 예약 서비스
![reserveCounsel](https://user-images.githubusercontent.com/60915285/204677061-28abdca6-0cef-4246-be03-088e2dacb09e.gif)
* 상단에서 나의 예약 정보를 확인할 수 있습니다. 
* 예약 취소가 가능하며, 입장 버튼을 통해 해당 상담사가 상주한 메타버스 방으로 이동하여 상담을 진행합니다.
* 상담 예약 시엔 상담을 받고 싶은 주제를 선택하여 원하는 상담사를 선택하고 날짜, 시간을 선택하여 예약을 완료합니다.
<br>
<br>

### 상담사 빅데이터 추천 서비스
![counselList](https://user-images.githubusercontent.com/60915285/204677090-c7dab6fd-1b0e-4f6c-8876-0abcc7600c7a.gif)

* 각각의 사용자의 성향에 맞는 상담사 추천 서비스를 제공합니다. 원하시는 상담사를 손쉽게 찾을 수 있습니다.
* 상담사의 전문 분야에 따른 전체 상담사 목록도 확인할 수 있습니다.
<br>
<br>

### 상담사 리뷰
![counselreview](https://user-images.githubusercontent.com/60915285/204677120-b75941d9-5dfc-4eb8-a6e5-7c869b8bc6e7.gif)

* 상담사와의 상담 종료 후 해당 상담사에 대한 별점과 리뷰를 남길 수 있습니다.
* 해당 내용은 추후 상담사 맞춤 추천 서비스의 데이터로 사용됩니다.
<br>
<br>

### 1분 데일리 미션<br>
![mission](https://user-images.githubusercontent.com/60915285/204677136-8f3f4ab4-eabb-4a7b-bfb6-33306ad4eaa4.gif)

- 마음을 다스리는 데일리 1분 미션을 수행합니다.

- 스탬프 색을 통해 하루에 수행한 미션 갯수 확인이 가능하고, 날짜별 스탬프를 모을 수 있습니다.

  <br>

  

### 상담사 로그인 / 마이페이지<br>
![counselor](https://user-images.githubusercontent.com/60915285/204677154-3120fa42-55c4-4e88-ac88-2b778f4eabf3.gif)
- 상담사는 마이페이지에서 예약 일정을 확인하고 메타버스 입장이 가능합니다.
<br>


## 프로젝트 산출물✏

- [요구사항 명세서](https://docs.google.com/spreadsheets/d/1wqxq_37LHVrLwG95qNnF8Qxr5pk0scwcUsZ9KtmnuQY/edit#gid=0)

- [와이어 프레임](https://www.figma.com/file/UMwRVfUeCFs2bUAPA4dwPO/Hugging?node-id=0%3A1)

- [ERD](https://www.erdcloud.com/d/Lu4txFFatKsjZjNSy)

- [포팅 메뉴얼](https://github.com/SSAFY-Hugging/Hugging/blob/main/exec/B204_%ED%8F%AC%ED%8C%85%EB%AC%B8%EC%84%9C.pdf)

- [회의록](https://denim-beechnut-408.notion.site/d6fa4efdda094625a50c219cdd4f03d1)

- [데일리 스크럼](https://denim-beechnut-408.notion.site/efc532184c034994a7f5769cea7b006b)

- [외부 API 문서](https://github.com/SSAFY-Hugging/Hugging/blob/main/exec/B204_%EC%99%B8%EB%B6%80_API_%EB%AA%85%EC%84%B8%EC%84%9C.pdf)


  <br>

## 팀원 소개 👪


<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/Qulip">
            <img src="https://avatars.githubusercontent.com/Qulip" width="140px" /> <br> 👑 유일권 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/hjay1029">
            <img src="https://avatars.githubusercontent.com/hjay1029" width="140px" /> <br> 😉 김호진 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/yerim8373">
            <img src="https://avatars.githubusercontent.com/yerim8373" width="140px" />  <br> 😎 송예림 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/sungkyu523">
            <img src="https://avatars.githubusercontent.com/sungkyu523" width="140px" /> <br> 😮 조성규 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/joohee56">
            <img src="https://avatars.githubusercontent.com/joohee56" width="140px" /> <br> 😁 이주희 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/choijoohee213">
            <img src="https://avatars.githubusercontent.com/choijoohee213" width="140px" /> <br> 😊 최주희 <br>(Back-End) </a> <br></td>
    </tr>
</table>
<br>
