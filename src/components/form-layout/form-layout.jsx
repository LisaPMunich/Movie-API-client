import {Col, Form} from "react-bootstrap";
import "./form-layout.scss"

export function FormLayout({title, children}) {
    return (
        <Col className="form-layout mx-auto form-layout-text" sm={12} md={10} lg={4}>
            <div className="form-container">
                <Form className="form-border">
                    <h2 className="form-title">{title}</h2>
                    {children}
                </Form>
            </div>
        </Col>
    );
}