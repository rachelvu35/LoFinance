import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";

function Budget({ visible, onClose, onSave }) {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields();
        onClose();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Set Budget"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">

        <Form.Item
          name="category"
          label="Budget For"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select>
            <Select.Option value="all">All Categories</Select.Option>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="sport">Sport</Select.Option>
            <Select.Option value="gift">Gift</Select.Option>
            <Select.Option value="transport">Transport</Select.Option>
            <Select.Option value="house">House</Select.Option>
            <Select.Option value="government">Government</Select.Option>
          </Select>
        </Form.Item>
    
        <Form.Item
          name="amount"
          label="Budget Amount"
          rules={[{ required: true, message: "Please enter the budget amount!" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Budget;
