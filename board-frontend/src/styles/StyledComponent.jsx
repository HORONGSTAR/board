import styled from 'styled-components'

export const Warning = ({ children, display }) => {
   return (
      <small style={{ display: display ? 'block' : 'none', padding: '4px', color: 'orangered' }}>
         {children}
      </small>
   )
}

export const Box = styled.div`
   margin: 0 auto;
   padding: 20px;
   width: ${(props) => props.width + 'px' || '100%'};
`

export const Button = styled.button`
   margin: 2px;
   padding: 4px 12px;
   border: 1px solid #aaa;
   color: #444;
   font-size: 15px;
   font-weight: 500;
   border-radius: 5px;
   background-color: #eee;
   cursor: pointer;
   &:hover {
      background: #aaa;
      color: #fff;
   }
`

export const Input = styled.input`
   margin: 2px;
   padding: 4px 12px;
   border: 1px solid #aaa;
   border-radius: 5px;
`

export const Textarea = styled.textarea`
   margin: 2px;
   padding: 4px 12px;
   border: 1px solid #aaa;
   border-radius: 5px;
`

export const UploadFild = styled.div`
   width: 150px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 2px;
   padding: 4px 12px;
   border: 1px solid #aaa;
   color: #444;
   cursor: pointer;
   font-size: 15px;
   font-weight: 500;
   border-radius: 5px;
   background-color: #eee;
   &:hover {
      background: #aaa;
      color: #fff;
   }
`
