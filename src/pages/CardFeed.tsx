import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSWRInfinite } from "swr";
import styled from "styled-components";
import CardItem from "../components/card";
import { Container } from "../components/layout";
import Toolbar from "../components/toolbar";
import { CardData } from "../components/card/types";
import useIntersection from "../hooks/useIntersection";
import { LocalStorageWorker } from "../utils/localstorage";

// api 관련
// 따로 api쪽을 따로 관리를 하려고 했는데 최대한 간단하게 하려고 해당컴포넌트에 작성
// 원래 axios를 사용을 합니다. 최근 nextjs를 공부하고있는데 아주유용한 swr라이브러리를 알게되었습니다.(https://swr.vercel.app/)
// 캐싱관리와 로딩등등 처리하기가 아주 편하게 되어있어 공부하고 있습니다.
const baseURL = (page: number) => `https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${page}.json`;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 리스트관련
// virtual list적용 관련 (뷰포트 영역만 리스트 랜더링 - dom 최소화)
// 과제를 하면서 해당부분을 적용을 해야할까 고민을 했습니다.
// 리스트 호출결과 많지않아 해당부분은 적용하지 않았습니다.

const Grid = styled(Container)<{ isMin: boolean }>`
	display: grid;
	margin-bottom: 30px;
	grid-gap: 30px 20px;
	grid-auto-columns: 268px;

	column-count: 3;
	grid-template-columns: ${({ isMin }) => (isMin ? "repeat(4, 268px)" : "repeat(auto-fit, minmax(268px, 1fr))")};
	/* grid-template-columns: repeat(auto-fit, minmax(268px, 1fr)); */
`;
const storageKey = "bookmark";
const storage = new LocalStorageWorker();

const CardFeed: React.FC<{}> = () => {
	// 필터
	const [isFilterShow, setFilterShow] = useState<boolean>(false);

	const handleFilter = useCallback(
		(e: any) => {
			setFilterShow(e.target.checked);
		},
		[setFilterShow]
	);

	// 리스트조회
	const { data, error, size, setSize } = useSWRInfinite((index) => baseURL(index + 1), fetcher, { revalidateOnFocus: false });
	const cardFeedData = data ? [].concat(...data) : [];
	const bookmarkList = cardFeedData.filter((e: CardData) => storage.get(storageKey).includes(e.id));

	// 요청끝을 판별하기위해 제가 알수있는부분은 빈배열뿐이라 빈배열 여부로 끝을 판별합니다.
	const isLoadingInitialData = !data && !error;
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length === 0);

	// 무한스크롤
	const loader = useRef(null);
	const entry = useIntersection(loader);

	useEffect(() => {
		if (!isFilterShow) {
			if (entry && entry.isIntersecting && entry.intersectionRatio > 0 && !isLoadingInitialData) {
				console.log(entry);
				setSize(size + 1);
			}
		}
	}, [entry, isFilterShow]);

	return (
		<>
			<Toolbar isFilterShow={isFilterShow} onChange={handleFilter} />
			<Grid as='section' isMin={!isFilterShow ? cardFeedData.length < 4 : bookmarkList.length < 4}>
				{isFilterShow
					? bookmarkList.map((data: CardData) => <CardItem key={data.id} data={data} />)
					: cardFeedData.map((data: CardData) => <CardItem key={data.id} data={data} />)}
			</Grid>
			{!isReachingEnd && <div ref={loader} style={{ height: 10 }} />}
		</>
	);
};
export default CardFeed;
