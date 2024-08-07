import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";
import style from "./mystyle.module.css";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value, 10),
      discount: parseFloat(discountRef.current.value),
    };

    setDataItems((prevItems) => {
      const index = prevItems.findIndex(
        (v) => v.item === newItem.item && v.ppu === newItem.ppu
      );

      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
          ...updatedItems[index],
          qty: updatedItems[index].qty + newItem.qty,
          discount: updatedItems[index].discount + newItem.discount,
        };
        return updatedItems;
      }

     
      return [...prevItems, newItem];
    });

    
    qtyRef.current.value = 1;
    discountRef.current.value = 0;
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const clearItems = () => {
    setDataItems([]);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container fluid className={style.appContainer}>
      <Row className={style.flexContainer}>
        <Col md={4} className={`${style.flexColumn} ${style.formColumn}`}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item</Form.Label>
              <Form.Select ref={itemRef} onChange={productChange} className={style.formControl}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                placeholder="Price per unit"
                onChange={(e) => setPpu(parseFloat(e.target.value))}
                className={style.formControl}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                ref={qtyRef}
                defaultValue={1}
                placeholder="Quantity"
                className={style.formControl}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                ref={discountRef}
                defaultValue={0}
                placeholder="Discount"
                className={style.formControl}
              />
            </Form.Group>

            <hr />
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={addItem} className={style.addButton}>
                Add
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={8} className={style.flexColumn}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearItems={clearItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
