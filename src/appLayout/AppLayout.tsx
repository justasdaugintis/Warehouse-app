import React from "react";
import { BarcodeOutlined, PlusCircleOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Routes as RoutedComponent } from "../routes";
import { useLocation } from "react-router-dom";
import "./style.scss";
import SubMenu from "antd/lib/menu/SubMenu";
import { useFormatMessage } from "react-intl-hooks";
import { useDispatch } from "react-redux";
import { languageActions } from "../reducers/LanguageSlice";

/**
 * Application layout component
 */
const AppLayout: React.FC = () => {
  const { Header, Content, Footer } = Layout;

  const dispatch = useDispatch();

  const location = useLocation();

  const translate = useFormatMessage();

  const setLanguage = (e: any): void => {
    dispatch(languageActions.setLanguage(e.key));
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]} selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined className="home-icon" />
            </Link>
          </Menu.Item>

          <Menu.Item key="/products" icon={<BarcodeOutlined />}>
            <Link to="/products">{translate({ id: "menu.products" })}</Link>
          </Menu.Item>

          <Menu.Item key="/products/create" icon={<PlusCircleOutlined />}>
            <Link to="/products/create">{translate({ id: "menu.create" })}</Link>
          </Menu.Item>

          <SubMenu key="languageSelect" icon={<SettingOutlined />} title={translate({ id: "menu.language" })}>
            <Menu.Item onClick={setLanguage} key="en">
              {translate({ id: "menu.languageEnglish" })}
            </Menu.Item>
            <Menu.Item onClick={setLanguage} key="lt">
              {translate({ id: "menu.languageLithuanian" })}
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>

      <Content className="content-wrapper">
        <div className="site-layout-content">
          <RoutedComponent />
        </div>
      </Content>

      <Footer></Footer>
    </Layout>
  );
};

export default AppLayout;
