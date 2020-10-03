import { PageHeader, Table } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { warehouseActions } from "../../reducers/ProductSlice";
import { ActiveCheckbox } from "./ActiveCheckbox";
import { Buttons } from "./Buttons";
import { useFormatMessage } from "react-intl-hooks";
import { IProduct } from "../../sharedInterfaces/IProduct";
/**
 *  Component responsible for rendering product list
 */
export const ProductList: React.FC = () => {
  const { products } = useSelector((state: IRootState) => state.warehouseData);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const dispatch = useDispatch();

  const history = useHistory();

  const deleteProduct = (record: any): void => {
    dispatch(warehouseActions.deleteProduct(record.id));
  };

  const translate = useFormatMessage();

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tickCheckbox = (e: CheckboxChangeEvent, record: any) => {
    let payload = {
      id: record.id,
      isActive: e.target.checked,
    };
    dispatch(warehouseActions.setProductActive(payload));
  };

  useEffect(() => {
    //selects rows that have quantity equal to 0
    const rowsToSelect: any = [];
    products.forEach((product: IProduct) => {
      if (product.quantity === 0) {
        rowsToSelect.push(product.id);
      }
    });
    setSelectedRowKeys(rowsToSelect);
  }, []);

  const columns = [
    {
      title: translate({ id: "productListTable.name" }),
      dataIndex: "name",
      key: "name",
    },
    {
      title: translate({ id: "productListTable.ean" }),
      dataIndex: "ean",
      key: "ean",
    },
    {
      title: translate({ id: "productListTable.type" }),
      dataIndex: "type",
      key: "type",
    },
    {
      title: translate({ id: "productListTable.weight" }),
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: translate({ id: "productListTable.color" }),
      dataIndex: "color",
      key: "color",
    },
    {
      title: translate({ id: "productListTable.price" }),
      dataIndex: "price",
      key: "price",
    },
    {
      title: translate({ id: "productListTable.quantity" }),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: translate({ id: "productListTable.active" }),
      dataIndex: "active",
      key: "active",
      render: (text: boolean, record: any) => (
        <ActiveCheckbox text={text} record={record} tickCheckbox={tickCheckbox} translate={translate} />
      ),
    },
    {
      title: translate({ id: "productListTable.actions" }),
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Buttons history={history} record={record} deleteProduct={deleteProduct} translate={translate} />
      ),
    },
  ];

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title={translate({ id: "productListTable.pageHeaderTitle" })}
        subTitle={translate({ id: "productListTable.pageHeaderSubtitle" })}
      />
      <Table dataSource={products} columns={columns} scroll={{ x: 800 }} rowSelection={rowSelection} />
    </Fragment>
  );
};
