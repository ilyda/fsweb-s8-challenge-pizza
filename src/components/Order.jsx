import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();

  const initialForm = {
    size: "",
    order: "",
    ekMalzemeler: [],
    counter: 1,
    notes: ""
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const counter = form.counter;
  const isDisabled = counter === 0;

  const unitPrice = counter === 0 ? 0 : 85.5;
  const extraPricePerItem = 5;
  const extraPrice = form.ekMalzemeler.length * extraPricePerItem;
  const totalPrice = unitPrice * counter + extraPrice;

  const validate = (values = form) => {
    const newErrors = {};
    if (!values.size) newErrors.size = "Lütfen boyut seçin.";
    if (!values.order) newErrors.order = "Lütfen hamur kalınlığı seçin.";
    if (!values.ekMalzemeler.length)
      newErrors.ekMalzemeler = "En az 1 ek malzeme seçmelisiniz.";
    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedForm = { ...form };

    if (type === "checkbox") {
      updatedForm.ekMalzemeler = checked
        ? [...form.ekMalzemeler, value]
        : form.ekMalzemeler.filter(item => item !== value);
    } else {
      updatedForm[name] = value;
    }

    setForm(updatedForm);

    if (isSubmitted) {
      setErrors(validate(updatedForm));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: form });
    }
  };

  const decrease = () => {
    if (counter > 0) {
      setForm(prev => ({ ...prev, counter: prev.counter - 1 }));
    }
  };

  const increase = () => {
    setForm(prev => ({ ...prev, counter: prev.counter + 1 }));
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card className="order-card">
              <Form onSubmit={handleSubmit}>
                <CardBody>

                  <h5 className="title">Position Absolute Acı Pizza</h5>

                  <div className="price-content">
                    <span className="price">{totalPrice.toFixed(2)} ₺</span>
                    <span className="text-muted">4.9 (200)</span>
                  </div>

                  <p className="text">
                  Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
                  </p>
                  <Row className="mt-4">
                    <Col md="6">
                      <Label>
                        Boyut Seç <span className="text-danger">*</span>
                      </Label>
                      {["Küçük", "Orta", "Büyük"].map(size => (
                        <FormGroup check key={size}>
                          <Input
                            type="radio"
                            name="size"
                            value={size}
                            checked={form.size === size}
                            onChange={handleChange}
                            invalid={!!errors.size}
                          />
                          <Label check>{size}</Label>
                        </FormGroup>
                      ))}
                    </Col>

                    <Col md="6" className="mt-4 mt-md-0">
                      <Label>
                        Hamur Seç <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="select"
                        name="order"
                        value={form.order}
                        onChange={handleChange}
                        invalid={!!errors.order}
                      >
                        <option value="">Hamur Kalınlığı</option>
                        <option value="İnce">İnce</option>
                        <option value="Orta">Orta</option>
                        <option value="Kalın">Kalın</option>
                      </Input>
                    </Col>
                  </Row>

                  <div className="mt-4">
                    <Label>Ek Malzemeler</Label>
                    <p className="text">En fazla 10 malzeme – 5₺</p>

                    <Row>
                      {[
                        ["Pepperoni", "Tavuk Izgara", "Mısır"],
                        ["Sosis", "Soğan", "Sucuk"],
                        ["Kanada Jambonu", "Domates", "Jalepeno"]
                      ].map((group, i) => (
                        <Col xs="4" key={i}>
                          {group.map(item => (
                            <FormGroup check key={item}>
                              <Input
                                type="checkbox"
                                value={item}
                                checked={form.ekMalzemeler.includes(item)}
                                onChange={handleChange}
                                invalid={!!errors.ekMalzemeler}
                                data-cy="extra-item"
                              />
                              <Label check>{item}</Label>
                            </FormGroup>
                          ))}
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="mt-4">
                    <Label>Sipariş Notu</Label>
                    <Input
                      type="textarea"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      data-cy="order-note"
                    />
                  </div>

                  <div className="sub-content mt-4 ">
                    <div className="item counter-box d-none d-lg-block">
                      <Button color="warning" onClick={decrease} disabled={isDisabled}>-</Button>
                      <span className="mx-3">{counter}</span>
                      <Button color="warning" onClick={increase}>+</Button>
                    </div>

                    <div className="item summary-box">
                      <h6 className="mb-3">Sipariş Toplamı</h6>

                      <div className="d-flex justify-content-between">
                        <span>Seçimler</span>
                        <strong>{extraPrice.toFixed(2)} ₺</strong>
                      </div>

                      <div className="d-flex justify-content-between mt-2 text-danger fw-bold">
                        <span>Toplam</span>
                        <span>{totalPrice.toFixed(2)} ₺</span>
                      </div>

                      <Button
                        color="warning"
                        type="submit"
                        className="w-100 mt-3 d-none d-lg-block"
                        disabled={isDisabled}
                      >
                        SİPARİŞ VER
                      </Button>
                    </div>
                         <div className="d-flex d-lg-none justify-content-between">
                    <div className="item counter-box ">
                      <Button color="warning" onClick={decrease} disabled={isDisabled}>-</Button>
                      <span className="mx-3">{counter}</span>
                      <Button color="warning" onClick={increase}>+</Button>
                    </div>
                   
                     <Button
                        color="warning"
                        type="submit"
                        className="w-100 mt-3 d-lg-none warning"
                        disabled={isDisabled}
                      >
                        SİPARİŞ VER
                      </Button>
                      </div>
                  </div>




                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
