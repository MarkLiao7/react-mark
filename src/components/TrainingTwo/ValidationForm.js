import { Formik } from "formik";
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Switch,
  Select,
  Radio,
  Button,
  Modal,
  Typography,
} from "antd";
import "../../myStyle.css";
import React from "react";
import { getDescriptionLength, valuesSchema } from "./validationSchema";
import { FORM_COLOR_OPTION, FORM_MODE, GENDER_OPTION } from "./Constant";
import DateTimePickerStartEnd from "./DateTimePickerStartEnd";
import { useContext } from "react";
import { MyContext } from "./TrainingTwo";
import { useState } from "react";
import { useEffect } from "react";
const { Title } = Typography;
const ValidationForm = ({ formMode, formVisible }) => {
  const [title, setTitle] = useState("新增資料");
  let initFormikValue = () => {
    const value = {
      serialNumber: "",
      organizationName: "",
      weight: "0",
      price: 0,
      description: "",
      instruction: "",
      hasUpperLimit: false,
      upperLimit: "",
      color: [],
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      startEndDateTime: [null, null, null, null],
      gender: 0,
    };
    return value;
  };

  useEffect(() => {
    switch (formMode) {
      case FORM_MODE.ADD:
        setTitle("新增資料");
        break;
      case FORM_MODE.EDIT:
        setTitle("編輯資料");
        break;
      default:
        break;
    }
  }, [formMode]);

  const { updateValidationFormList, setFormVisible } = useContext(MyContext);

  const submitForm = (values) => {
    console.log(values);
    updateValidationFormList(values);
  };

  return (
    <Modal
      visible={formVisible}
      width="80vw"
      onCancel={() => {
        setFormVisible(false);
      }}
    >
      <div>
        <Title>{title}</Title>
        <Formik
          initialValues={initFormikValue()}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
          validationSchema={valuesSchema}
        >
          {(props) => {
            const layout = {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            };

            return (
              <Form {...layout}>
                <Row justify="space-around" style={{ width: "80vw" }}>
                  <Col span={6}>
                    <Form.Item label="編號" required={true} colon={false}>
                      <div style={{ display: "inline-block" }}>
                        <Input
                          style={{ width: "12rem", display: "block" }}
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.serialNumber}
                          name="serialNumber"
                          placeholder="請輸入"
                          suffix={`${props.values.serialNumber.length}/10`}
                        />
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.serialNumber
                            ? props.errors.serialNumber
                            : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="組織名稱" colon={false}>
                      <div style={{ display: "inline-block" }}>
                        <Input
                          style={{ width: "15rem", display: "block" }}
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.organizationName}
                          name="organizationName"
                          placeholder="請輸入"
                          suffix={`${props.values.organizationName.length}/15`}
                        />
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.organizationName
                            ? props.errors.organizationName
                            : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="重量" colon={false}>
                      <div style={{ display: "inline-block" }}>
                        <Input
                          style={{ width: "10rem", display: "block" }}
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          placeholder="0"
                          suffix="kg"
                        />
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.weight ? props.errors.weight : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="價格" colon={false} required={true}>
                      <div style={{ display: "inline-block" }}>
                        <InputNumber
                          style={{ width: "10rem", display: "block" }}
                          min={0}
                          max={1000}
                          precision={0}
                          onChange={(value) => {
                            props.setFieldValue("price", value, false);
                          }}
                          onBlur={props.handleBlur}
                          value={props.values.price}
                          name="price"
                        />
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.price ? props.errors.price : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around" style={{ width: "100vw" }}>
                  <Col span={8}>
                    <Form.Item required={true} label="描述" colon={false}>
                      <div style={{ display: "inline-block" }}>
                        <Input.TextArea
                          style={{ width: "60vw", height: "30vh" }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.description}
                          name="description"
                        />
                        <br />
                        <label
                          style={{ width: "2rem" }}
                        >{`${getDescriptionLength(
                          props.values.description
                        )}/3000`}</label>
                        &nbsp;&nbsp;&nbsp;
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.description
                            ? props.errors.description
                            : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around" style={{ width: "100vw" }}>
                  <Col span={7}>
                    <Form.Item label="使用方式" colon={false}>
                      <div style={{ display: "inline-block" }}>
                        <Input
                          style={{ width: "15rem", display: "block" }}
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.instruction}
                          name="instruction"
                          placeholder="請輸入"
                          suffix={`${props.values.instruction.length}/15`}
                        />
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.instruction
                            ? props.errors.instruction
                            : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      label="上限"
                      colon={false}
                      required={props.values.hasUpperLimit}
                    >
                      <div style={{ display: "inline-block" }}>
                        <Switch
                          style={{ display: "inline" }}
                          onChange={(value) => {
                            props.setFieldValue("hasUpperLimit", value, false);
                            if (!value) {
                              props.setFieldValue("upperLimit", "", false);
                            }
                          }}
                          onBlur={props.handleBlur}
                          checked={props.values.hasUpperLimit}
                          value={props.values.hasUpperLimit}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <Input
                          style={{ width: "12rem" }}
                          type="text"
                          disabled={!props.values.hasUpperLimit}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.upperLimit}
                          name="upperLimit"
                          placeholder={
                            props.values.hasUpperLimit ? "請輸入" : ""
                          }
                          suffix={`${props.values.upperLimit.length}/10`}
                        />
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.values.hasUpperLimit
                            ? props.touched.upperLimit
                              ? props.errors.upperLimit
                              : null
                            : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="顏色" colon={false} required={true}>
                      <div style={{ display: "inline-block" }}>
                        <Select
                          style={{ width: "8rem" }}
                          mode="multiple"
                          placeholder="請選擇"
                          value={props.values.color}
                          name="color"
                          onChange={(value) => {
                            value.sort();
                            props.setFieldValue("color", value, true);
                          }}
                          /*好像有問題 回傳的值與onChange相同*/
                          onBlur={() => {
                            props.setFieldTouched("color", true);
                          }}
                        >
                          {FORM_COLOR_OPTION.map((val, index) => {
                            return (
                              <Select.Option value={index} key={index}>
                                {val}
                              </Select.Option>
                            );
                          })}
                        </Select>
                        <label style={{ color: "red", fontSize: "0.5rem" }}>
                          {props.touched.color ? props.errors.color : null}
                        </label>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around" style={{ width: "100vw" }}>
                  <DateTimePickerStartEnd
                    startDate={props.values.startDate}
                    startTime={props.values.startTime}
                    endDate={props.values.endDate}
                    endTime={props.values.endTime}
                    value={props.values.startEndDateTime}
                    name="startEndDateTime"
                    errorMessage={
                      props.touched.startEndDateTime
                        ? props.errors.startEndDateTime
                        : null
                    }
                    onBlur={() => {
                      props.setFieldTouched("startEndDateTime", true);
                    }}
                  />

                  <Col span={8}>
                    <Form.Item label="性別" colon={false} required={true}>
                      <Radio.Group
                        onChange={props.handleChange}
                        value={props.values.gender}
                        name="gender"
                      >
                        {GENDER_OPTION.map((val, id) => {
                          return (
                            <Radio value={id} key={id}>
                              {val}
                            </Radio>
                          );
                        })}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <div
                  style={{
                    margin: "0px auto",
                    width: "15rem",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={() => {
                      props.handleReset();
                    }}
                  >
                    Reset Form
                  </Button>
                  {/*
                  <Button
                    onClick={() => {
                      if (props.isValid) {
                        submitForm(props.values);
                      } else {
                      }
                    }}
                  >
                    Test Save
                  </Button>*/}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default ValidationForm;