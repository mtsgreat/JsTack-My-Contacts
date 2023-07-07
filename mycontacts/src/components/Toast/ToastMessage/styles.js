import styled from 'styled-components';

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
