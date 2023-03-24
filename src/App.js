import styled from "styled-components";
import {DynamicTable} from "./components/DynamicTable";

const StyledDiv = styled.div`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const App = () => {
    return (
        <StyledDiv>
            <DynamicTable/>
        </StyledDiv>
    );
};

export default App;
