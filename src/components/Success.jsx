import React from "react";
import { Container, Row, Col } from "reactstrap";
const Success = () => {
    return (
        <div className="section-content">
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col className="text-center content">
                        <div className="brand">Teknolojik Yemekler</div>
                        <div className="title" style={{
                            fontFamily: "Roboto Condensed",
                            fontWeight: "300",
                            fontSize: "86px",
                            lineHeight: "92px",
                            marginTop: "10%",
                        }}>
                            TEBRİKLER!<br></br>
                            SİPARİŞİNİZ ALINDI!
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Success;
