import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import debounce from "../../utils/debounce";
import { LocalStorageWorker } from "../../utils/localstorage";
import { BookmarkIcon } from "../icons";
import { useToast } from "../toast/toastProvider";
import Profile from "./Profile";
import { CardData } from "./types";

const Div = styled.div`
	position: relative;
	.card-image-wrap {
		&__bookmark {
			position: absolute;
			bottom: 10px;
			right: 10px;
		}
	}
`;

const IconButton = styled.button`
	cursor: pointer;
	padding: 0;
	border: 0;
	outline: 0;
	background-color: transparent;
`;

const ImageWrap = styled.div.attrs({})`
	border-radius: 10px;
	overflow: hidden;

	img {
		display: block;
		width: 100%;
	}
`;

interface Props {
	data: CardData;
}
const storageKey = "bookmark";
const storage = new LocalStorageWorker();

const CardItem: React.FC<Props> = ({ data }) => {
	const { id, image_url, nickname, profile_image_url } = data;
	// 토스트
	const toast = useToast();
	const [isBookmark, setBookmark] = useState<boolean>(storage.has(storageKey, id));

	const handleSetBookmark = useCallback(
		(id: number) => () => {
			// 더 좋은방법이 있을거같은데
			// 북마크 영역이 전체 랜더됨;;

			// 토스트는 프로미스로 처리해도될듯함
			if (!storage.has(storageKey, id)) {
				storage.add(storageKey, id);
				setBookmark(true);
				toast({ title: "북마크 등록", time: new Date().valueOf() });
			} else {
				storage.del(storageKey, id);
				setBookmark(false);
				toast({ title: "북마크 취소", time: new Date().valueOf() });
			}
		},
		[setBookmark]
	);
	return (
		<Div>
			<Profile url={profile_image_url} name={nickname} />
			<ImageWrap className='card-image-wrap'>
				<img src={image_url} alt={`${nickname} card feed`} />
			</ImageWrap>
			<IconButton className='card-image-wrap__bookmark' onClick={debounce(handleSetBookmark(id), 300)}>
				<BookmarkIcon isBookmark={isBookmark} />
			</IconButton>
		</Div>
	);
};

export default memo(CardItem);
