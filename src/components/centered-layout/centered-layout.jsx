import {Col} from "react-bootstrap";

export default function CenteredLayout({children}) {
    return (
        <Col className="centered-layout mx-auto" sm={12} md={10} lg={8}>
            {children}
        </Col>
    );
}