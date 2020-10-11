## 목차

* [시작하기 앞서](#summary)
* [사용한 라이브러리](#use-lib)
* [폴더구조](#structure)
* [시작하기](#start)
* [설치 및 실행](#install)
* [문제해결](#solution)



## 시작하기 앞서 <a name="summary"></a>
template는 Create-react-app을 사용하여 최초 생성하였습니다.

이 과제에는 최대한 심플하게, 다른 라이브러리(상태관리(redux) 관련) 없이 해보자라는 생각으로 개발하였습니다.



### 사용한 라이브러리 <a name="use-lib"></a>
과제를 실행함에 있어 아래의 라이브러리를 사용하였습니다.

* [react-transition-group](https://reactcommunity.org/react-transition-group/)
* [styled-components](https://styled-components.com/)
* [swr](https://swr.vercel.app/)
* typescript
* react

## 폴더 구조 <a name="structure"></a>

```
.src
+-- components
| +-- card : 피드 카드들을 위한 폴더
| +-- icons : svg icon 폴더
| +-- toast : 북마크 사용자 인터렉션을 하기위한 context api/portal을 사용한 컴포넌트 폴더
| +-- toolbar : 페이지 상단 필터 컴포넌트
|
+-- hooks
| +-- useIntersection.ts : infinite page load를 위한 hook
|
+-- pages : 모든 컴포넌트
| +-- CardFeed : 피트 컴포넌트 (컨테이너)
|
+-- utils
| +-- debounce.ts : 지연함수
| +-- localstorage.ts : 로컬 스토리지관련 함수

```


## 시작하기 <a name="start"></a>

과제는 따로 배포는 하지않았습니다.
로컬에서 실행 합니다.


### 설치 <a name="install"></a>

1. 저장소 클론
```sh
git clone https://github.com/maymkwon/bucketplace-homework.git
```
3. 패키지 설치
```sh
npm install
```
4. 실행
```sh
npm start
```


## 문제 해결 <a name="solution"></a>

1. 폴더구성

기본적으로 컴포넌트가 많아질경우를 생각하면서 구성해보았습니다.
각 폴더안에 index를 두어 컴포넌트를 export 하였습니다.

사실 이 프로젝트에는 컴포넌트들이 많지않아 위와같은 방식을 하지 않아도 됩니다.

2. 디자인

전체적인 디자인은 styled-components 로 작성을 했습니다.

최근에 gird layout을 탐구하고 있는데 이번 과제에 한번 사용해 보았습니다.(원래는 flex를 이용합니다.)

grid-template-columns 속성을 사용해서 각 피드 아이템들의 그리드를 잡았습니다.

그외에 아이템들의 간격등을 조절 했습니다.

아이콘들을 이미지를 사용을 할까 svg를 사용할까 하다가 svg를 이용해서 props로 svg의 색을 조절하는 방식으로 개발했습니다.

3. 무한 스크롤

swr과 Intersection Observer 를 이용해서 무한스크롤을 구현하였습니다.

기존 데이터 api는 axios를 계속 사용해왔었는데 최근 공부하고 있는 라이브러리 swr를 사용해보았습니다.

다음페이지 조회부분은 Intersection Observer를 이용, 교차여부로 다음페이지를 조회하는 방식을 사용하였습니다.
이부분은 따로 hook으로 만들어서 컨테이너 컴포넌트에서 사용할수 있게 만들었습니다.

useEffect에서 교차여부와 데이터 여부, 필터여부를 이용해서 조회합니다.


4. 스크랩

로컬스토리지를 이용한 스크랩 기능과 인터렉션을 구현하였습니다.

로컬스토리지에 id를 담아서 배열안의 id와 카드의 id를 비교하여 북마크 svg의 상태를 on/off 하는방식으로 구현하였습니다.

그리고 계속해서 북마크를 클릭을 방지(?) 하고자 debounce를 적용하여 마지막이벤트를 받은뒤 0.3초후 이벤트를 발생시키도록 하였습니다.

그리고 context api와 react portal을 사용해서 유저 인터렉션을 구현했습니다.

오늘의 집 홈페이지에서 북마크 인터렉션을보고 ui를 작성했습니다.

context api를 사용한이유는 전역적인 데이터를 관리하기 위함입니다.

큰프로젝트에서는 리덕스나 상태관리를 하기위한것을 사용하는데 

이 프로젝트는 그 의미가 없을것같아(사용대비 불필요한 설정일것같다라는 생각) 사용하지 않고 context api를 통해서 전역적인 상태를 공유할수있게 하였습니다.

그리고 portal을 사용하여 #root밖에서 토스트를 위한 공간을 따로 만들어 최대한 root의 dom에 영향이 미치지 않게 하려고 노력했습니다.

5. 필터기능

단순히 state를 이용하여 on/off하였고 조회된 피드데이터들과 로컬스토리지의 id들을 필터하여 그 결과를 보여줍니다.


