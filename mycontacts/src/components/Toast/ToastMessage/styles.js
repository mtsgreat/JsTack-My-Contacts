import styled, { keyframes, css } from 'styled-components';

const messageIn = keyframes`

  from { opacity: 0;
    transform: translateY(100px)
    }

  to {
    opacity: 1;
    transform: translateY(0px);
    }

`;

const messageOut = keyframes`

  from {
    opacity: 1;
    transform: translateY(0px);
    }

  to {
    opacity: 0;
    transform: translateY(100px)
    }

`;

export const Container = styled.div`
   padding: 16px 32px;
   background: ${({ theme }) => theme.colors.primary.main};
   color: #fff;
   border-radius: 4px;
   box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   animation: ${messageIn} 0.3s;


   ${({ isLeaving }) => isLeaving && css`animation: ${messageOut} 0.2s forwards;`}


   & + & {
    margin-top: 12px;
   }

   img {
    margin-right: 8px;
   }

   ${({ type, theme }) => type === 'danger' && `
     background: ${theme.colors.danger.dark}
   `}

   ${({ type, theme }) => type === 'sucess' && `
     background: ${theme.colors.sucess.main}
   `}
`;
