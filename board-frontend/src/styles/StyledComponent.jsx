import styled from 'styled-components'

const palette = {
   point: '#3669d8',
   pale: '#aab2c4',
   deep: '#404758',
   fill: '#eceef1',
}

export const Warning = ({ children, display }) => {
   return (
      <small style={{ display: display ? 'block' : 'none', padding: '4px', color: 'orangered' }}>
         {children}
      </small>
   )
}

export const Th = styled.th`
   width: ${(props) => props.w || 'none'};
`

export const Td = styled.td`
   text-align: ${(props) => props.align || 'center'};
`

export const Line = styled.img`
   margin: 10px 0;
   width: ${(props) => props.w || '100%'};
   height: 1px;
   background-color: ${palette.pale};
`

export const Img = styled.img`
   margin: 0;
   padding: ${(props) => props.p || '2px'};
   width: ${(props) => props.w || '100%'};
   max-width: ${(props) => props.max || '400px'};
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

export const Span = styled.span`
   padding: ${(props) => props.p || '0'};
   display: flex;
   color: ${(props) => palette[props.theme] || palette.deep};
   font-size: ${(props) => props.size || '16px'};
   font-weight: 500;
   cursor: pointer;
   &:hover {
      text-decoration: underline;
   }
`
export const Button = styled.button`
   margin: 2px;
   padding: 4px 12px;
   border: 1px solid ${palette.pale};
   color: ${palette.deep};
   font-size: 14px;
   font-weight: 500;
   border-radius: 5px;
   background: ${palette.fill};
   cursor: pointer;
   &:hover {
      background: #aaa;
      color: #fff;
   }
`

export const FakeBtn = styled.span`
   padding: 4px 12px;
   border: 1px solid ${palette.pale};
   color: ${palette.deep};
   cursor: pointer;
   font-size: 14px;
   font-weight: 500;
   border-radius: 5px;
   background: ${palette.fill};
   &:hover {
      background: #aaa;
      color: #fff;
   }
`

export const Label = styled.label`
   padding: ${(props) => props.p || '4px'};
   width: ${(props) => props.w || '100%'};
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
export const Ul = styled.ul`
   margin: 0 auto;
   padding: ${(props) => props.p || '0'};
   width: ${(props) => props.w || '100%'};
   max-width: ${(props) => props.max || 'none'};
   min-width: ${(props) => props.min || 'none'};
   height: ${(props) => props.w || 'none'};
   display: ${(props) => props.display || 'flex'};
   flex-flow: ${(props) => props.col && 'column'} wrap;
   box-sizing: border-box;
   justify-content: ${(props) => props.jc || 'baseline'};
   align-items: ${(props) => props.ai || 'center'};
`
export const Li = styled.li`
   padding: 4px 12px;
   width: ${(props) => props.w || 'none'};
   height: ${(props) => props.w || 'none'};
   display: ${(props) => props.display || 'flex'};
   justify-content: ${(props) => props.jc || 'baseline'};
   align-items: ${(props) => props.ai || 'center'};
`
