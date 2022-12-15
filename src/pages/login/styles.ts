import styled from "styled-components"

export const LoginContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const LoginFormContainer = styled.div`
	width: 900px;
	height: 500px;
	display: flex;
	border-radius: 10px;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
		0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
`

export const Left = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
`

export const FormContainer = styled.form `
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const FormContainerH1 = styled.div `
	font-size: 40px;
	margin-top: 0;
`

export const Input = styled.input `
	outline: none;
	border: none;
	width: 370px;
	padding: 15px;
	border-radius: 10px;
	background-color: #edf5f3;
	margin: 5px 0;
	font-size: 14px;
`

export const ErrorMsg = styled.div `
	width: 370px;
	padding: 15px;
	margin: 5px 0;
	font-size: 14px;
	background-color: #f34646;
	color: white;
	border-radius: 5px;
	text-align: center;
`

export const Right = styled.div `
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #3bb19b;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
`

export const RightH1 = styled.div`
	margin-top: 0;
	color: white;
	font-size: 40px;
	align-self: center;
`

export const GreenBtn = styled.button `
	border: none;
	outline: none;
	padding: 12px 0;
	background-color: white;
	border-radius: 20px;
	width: 180px;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
`
export const WhiteBtn = styled.button `
	border: none;
	outline: none;
	padding: 12px 0;
	background-color: white;
	border-radius: 20px;
	width: 180px;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
	background-color: #3bb19b;
	color: white;
`