import GWCouplesDisplayList from "../components/list/GWCouplesDisplayList";
import { Container } from "react-bootstrap";

const GWCouplesListView = () => {

    return (
        <Container className="container mx-auto">
            <GWCouplesDisplayList />
        </Container>
    );
}

export default GWCouplesListView;