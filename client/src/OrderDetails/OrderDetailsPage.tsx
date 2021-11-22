import React, {Component, ReactElement} from 'react';
import {OrderModel} from "@pavo/shared-services-shared/src";
import axiosInstance from "../Auth/AxiosInstance";
import {Breadcrumb, Button, Descriptions, notification} from "antd";
import {userService} from "../Services/UserService";
import { HomeOutlined } from '@ant-design/icons';

class OrderDetailsPage extends Component<any, {order: OrderModel}> {
    constructor(props: unknown) {
        super(props);
        this.state = {
          order: null,
        };
      }

      async componentDidMount() {
        await this.refreshOrder();
      }

      refreshOrder(): void {
        const { match: { params } } = this.props;
        axiosInstance.get(`/orders/getOrder/${params.id}`).then((response) => {
          this.setState({
            order: response.data,
          });
        });
      }

      participate(): void {
        axiosInstance.put("/orders/addParticipant", {
          orderId : this.state.order._id,
        }).then(() => {
          this.successNotification('You have successfully participated!');
          this.refreshOrder();
        }, () => this.errorNotification());
      }

      leave(): void {
        axiosInstance.put("/orders/removeParticipant", {
          orderId : this.state.order._id,
        }).then(() => {
          this.successNotification('You have left!');
          this.refreshOrder();
        }, () => this.errorNotification());
      }

      successNotification(message: string): void {
        notification["success"]({
          message,
        });
      };

      errorNotification() {
        notification["error"]({
          message: 'Something went wrong!',
        });
      };

      render(): ReactElement {
          const {order} = this.state;
          if(order === null) return <p>Loading ...</p>;
          return (
              <><Breadcrumb style={{paddingBottom: "10px"}}>
                <Breadcrumb.Item href="/">
                  <HomeOutlined/>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{order.product.title}</Breadcrumb.Item>
              </Breadcrumb><Descriptions
                  style={{maxWidth: "50vw"}}
                  contentStyle={{border: "1px solid #d3d3d3"}}
                  labelStyle={{border: "1px solid #d3d3d3"}}
                  bordered
                  title={order.product.title}
                  size={"default"}
                  column={1}
                  extra={!order.participants.find((p) => p._id === userService.getCredentials().id)
                      ? <Button type="primary" onClick={() => {
                        this.participate();
                      }}>Participate</Button>
                      : <Button type="primary" danger onClick={() => {
                        this.leave();
                      }}>Leave</Button>}
              >
                <Descriptions.Item label="Description">{order.product.description}</Descriptions.Item>
                <Descriptions.Item label="Price">{order.product.price}</Descriptions.Item>
                <Descriptions.Item
                    label="Required number of participants">{order.product.participantsAmount}</Descriptions.Item>
                <Descriptions.Item label="Participants">{order.participants?.map((participant) => (
                    <p key={participant._id}>{participant.firstName + " " + participant.lastName}</p>
                ))}</Descriptions.Item>
              </Descriptions></>
          )
      }

}

export default OrderDetailsPage;
