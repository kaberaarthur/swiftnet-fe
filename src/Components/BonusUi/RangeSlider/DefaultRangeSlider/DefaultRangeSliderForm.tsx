import { useState } from "react";
import { Col, Form, FormGroup, Row } from "reactstrap";
import { Range, getTrackBackground } from "react-range";

const DefaultRangeSliderForm = () => {
  const [values, setValues] = useState([20]);
  return (
    <Form className="theme-form form-label-align-right range-slider">
      <FormGroup>
        <Row className="py-1">
          <Col md="10">
            <div style={{ color: "var(--theme-default)" }} className="d-flex justify-content-center flex-wrap m-3">
              <Range values={values} step={1} min={0} max={100} onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} style={{ ...props.style, height: "36px" }} className="d-flex w-100">
                    <div ref={props.ref} className="rounded-2 w-100" style={{ height: "10px", background: getTrackBackground({ values: values, colors: ["var(--theme-default)", "#ccc"], min: 0, max: 100, }), alignSelf: "center", }} >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="d-flex justify-content-center align-items-center"style={{ ...props.style, height: "3px", width: "3px", backgroundColor: "#FFF", boxShadow: "0px 2px 6px #AAA", }} >
                    <div style={{ height: "20px", width: "5px", backgroundColor: "var(--theme-default)" }} />
                  </div>
                )}
              />
              <output id="output" className="mt-3">
                {" "}
                {values[0]}
              </output>
            </div>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default DefaultRangeSliderForm;
