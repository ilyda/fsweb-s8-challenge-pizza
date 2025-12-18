import { Container, Row, Col ,Button} from "reactstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="section-content"   style={{
    backgroundImage: "url('./images/iteration-1-images/home-banner.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
  }}>
      <Container fluid className="h-100">
        <Row >
          <Col className="text-center content">
            <div className="brand">Teknolojik Yemekler</div>
            <div className="title">
         KOD ACIKTIRIR<br></br>
Pİzza, DOYURUR
            </div>
              <Button color="warning"style={{
                borderRadius:"20px",
                width:"193px",
                height:"56px",
                marginTop:"50px",
                fontWeight:"600",
                color:"black"
  }}  onClick={() => navigate("/order")}>
    ACIKTIM
  </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
