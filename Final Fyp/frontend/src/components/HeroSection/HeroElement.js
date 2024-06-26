import styled from "styled-components";
import {MdKeyboardArrowRight , MdArrowForward } from 'react-icons/md';

export const HeroContainer = styled.div`
  background : grey;
  display : flex;
  justify-content : center;
  align-items : center;
  padding : 0 30px;
  height : 100vh;
  position : relative;
  z-index : 1;

}
`
export const HeroBg = styled.div`
   position : absolute;
   top:0;
   right : 0;
   bottom : 0;
   left : 0;
   width : 100%;
   height : 100%;
   overflow : hidden;
`

export const VideoBg = styled.video`
   width : 100%;
   height : 100%;
   -o-object-fit : cover;
   object-fit : cover;
   background : #232a34;
   filter: hue-rotate(5deg);

`

export const HeroContent = styled.div`
   z-index : 3;
   max-width : 1200px;
   position : absolute;
   padding : 8px 24px;
   display : flex;
   flex-direction : column;
   align-items : center;
`
export const HeroH1 = styled.div`
   color: #fff;
   font-size : 60px;
   text-align : center;
   font-weight: bold;

   @media screen and (max-width : 768px) {
      font-size : 60px;
   }

   @media screen and (max-width : 768px) {
      font-size : 30px;
   }
`

export const HeroP = styled.p`
   margin-top : 24px;
   color : #fff;
   font-size: 24px;
   text-align : center;
   max-width : 600px;

   @media screen and (max-width : 768px) {
      font-size : 24px;
   }

   @media screen and (max-width : 768px) {
      font-size : 18px;
   }
`

export const HeroBtnWrapper = styled.div`
  margin-top : 32px;
  display : flex;
  flex-direction : column;
  align-items : center;
`

export const ArrowForward = styled(MdArrowForward)`
  margin-left : 80px;
  font-size : 20px;
`
export const ArrowRight = styled(MdKeyboardArrowRight)`
margin-left : 80px;
font-size : 20px;
`
