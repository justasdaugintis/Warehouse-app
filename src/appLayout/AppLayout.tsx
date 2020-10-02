import React from "react";
import { BarcodeOutlined, PlusCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Routes as RoutedComponent } from "../routes";
import { useLocation } from "react-router-dom";
import "./style.scss";

/**
 * Application layout component
 */
const AppLayout: React.FC = () => {
  const { Header, Content, Footer } = Layout;

  let location = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]} selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined style={{ marginLeft: "8px" }} />
            </Link>
          </Menu.Item>

          <Menu.Item key="/products" icon={<BarcodeOutlined />}>
            <Link to="/products">List of products</Link>
          </Menu.Item>

          <Menu.Item key="/products/create" icon={<PlusCircleOutlined />}>
            <Link to="/products/create">Add new product</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <RoutedComponent />
        </div>
      </Content>

      <Footer></Footer>
    </Layout>
  );
};

export default AppLayout;
