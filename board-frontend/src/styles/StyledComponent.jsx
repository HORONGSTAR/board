import styled from 'styled-components'

export const Warning = ({ children, display }) => {
   return (
      <small style={{ display: display ? 'block' : 'none', padding: '4px', color: 'orangered' }}>
         {children}
      </small>
   )
}

export const Img = styled.img`
   margin: 0;
   padding: ${(props) => props.p || '2px'};
   width: ${(props) => props.w || '100%'};
   max-width: ${(props) => props.max || '500px'};
   min-width: ${(props) => props.min || 'none'};
   display: ${(props) => props.display || 'flex'};
   flex-flow: ${(props) => props.col && 'column'} wrap;
   box-sizing: border-box;
`

export const Box = styled.div`
   margin: 0 auto;
   padding: ${(props) => props.p || '2px'};
   width: ${(props) => props.w || '100%'};
   max-width: ${(props) => props.max || 'none'};
   min-width: ${(props) => props.min || 'none'};
   display: ${(props) => props.display || 'flex'};
   flex-flow: ${(props) => props.col && 'column'} wrap;
   box-sizing: border-box;
   justify-content: ${(props) => props.jc || 'baseline'};
   align-items: ${(props) => props.ai || 'baseline'};
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
export const FakeBtn = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
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

export const Label = styled.label`
   padding: ${(props) => props.p || '4px'};
`

export const Input = styled.input`
   padding: 4px;
   border: 1px solid #aaa;
   border-radius: 5px;
   width: ${(props) => props.w || '100%'};
`

export const Textarea = styled.textarea`
   padding: 4px;
   border: 1px solid #aaa;
   border-radius: 5px;
   width: ${(props) => props.w || '100%'};
   height: 300px;
`
