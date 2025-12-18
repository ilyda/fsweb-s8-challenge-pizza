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
                    Frontend Dev olarak hala position:absolute kullanıyorsan
                    bu çok acı pizza tam sana göre...
                  </p>

                  {/* BOYUT */}
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

                    <Col md="6">
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
                              />
                              <Label check>{item}</Label>
                            </FormGroup>
                          ))}
                        </Col>
                      ))}
                    </Row>
                  </div>

                  {/* NOT */}
                  <div className="mt-4">
                    <Label>Sipariş Notu</Label>
                    <Input
                      type="textarea"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                      <Button color="warning" onClick={decrease} disabled={isDisabled}>-</Button>
                      <span className="mx-2">{counter}</span>
                      <Button color="warning" onClick={increase}>+</Button>
                    </div>

                    <div className="text-end">
                      <p className="mb-1">
                        Seçimler <strong>{extraPrice.toFixed(2)} ₺</strong>
                      </p>
                      <p className="text-danger fw-bold">
                        Toplam {totalPrice.toFixed(2)} ₺
                      </p>
                    </div>
                  </div>

                  <Button
                    color="warning"
                    type="submit"
                    className="w-100 mt-3 fw-bold"
                    disabled={isDisabled}
                  >
                    SİPARİŞ VER
                  </Button>

                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
