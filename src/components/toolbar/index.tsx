import React from "react";
import styled from "styled-components";
import { CheckIcon } from "../icons";
import { Container } from "../layout";

const Header = styled(Container)`
	padding-top: 30px;
	padding-bottom: 30px;
	label {
		display: inline-flex;
		align-items: center;
	}
`;
const SvgInput = styled.span`
	position: relative;
	padding-right: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	input {
		top: 0;
		left: 0;
		width: 100%;
		cursor: inherit;
		height: 100%;
		margin: 0;
		opacity: 0;
		padding: 0;
		z-index: 1;
		position: absolute;
	}
`;

// 체크박스를 이미지대신 svg를 이용해서 작업했습니다.
// 상태에 따라 svg의 fill의 색을 변경합니다.
interface Props {
	isFilterShow: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toolbar: React.FC<Props> = ({ isFilterShow, onChange }) => {
	return (
		<Header as='header'>
			<label htmlFor='filter'>
				<SvgInput style={{ position: "relative" }}>
					<input type='checkbox' id='filter' onChange={onChange} />
					<CheckIcon className='svgIcon' isSelect={isFilterShow} />
				</SvgInput>
				<span>스크랩한 것만 보기</span>
			</label>
		</Header>
	);
};

export default Toolbar;
