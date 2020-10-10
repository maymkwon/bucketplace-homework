import React from "react";
import styled from "styled-components";

// 따로 스타일을 만드려했지만 그냥 하나의 스타일로 하위까지 스타일링
const Div = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	.profile-wrap {
		&__img {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 10px;
			border-radius: 50%;
			img {
				width: 36px;
				height: 36px;
			}
		}
		&__name {
			font-size: 15px;
			font-weight: bold;
			color: rgba(0, 0, 0, 0.74);
		}
	}
`;

interface Props {
	url: string;
	name: string;
}

const Profile: React.FC<Props> = ({ url, name }) => {
	return (
		<Div className='profile-wrap'>
			<div className='profile-wrap__img'>
				<img src={url} alt={`${name} profile`} />
			</div>
			<div className='profile-wrap__name'>
				<span>{name}</span>
			</div>
		</Div>
	);
};

export default Profile;
