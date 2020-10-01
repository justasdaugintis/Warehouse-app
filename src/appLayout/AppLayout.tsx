import React from "react";
import { BarcodeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Routes as RoutedComponent } from "../routes";
import "./style.scss";

/**
 * Application layout component
 */
const AppLayout: React.FC = () => {
  const { Header, Content } = Layout;

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="list" icon={<BarcodeOutlined />}>
            <Link to="/products">List of products</Link>
          </Menu.Item>
          <Menu.Item key="new" icon={<PlusCircleOutlined />}>
            <Link to="/products/create">Add new product</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <RoutedComponent />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
