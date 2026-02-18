import { useState, useEffect } from "react";
import {
  useFetchCommissionWithdrwalRequests,
  useFetchSingleCommissionWithdrawal,
  useApproveCommissionWithdrawal,
  useDeclineCommissionWithdrawal,
} from "../../hooks/commission-withdrawalApi";
import {
  Button,
  Modal,
  Input,
  Table,
  notification,
  Spin,
  Tag,
  List,
} from "antd";
import {
  UserOutlined,
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";

const CommissionWithdrawalRequests = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const queryClient = useQueryClient();

  const { data: withdrawalRequests } =
    useFetchCommissionWithdrwalRequests(page);
  const { data: singleRequest } =
    useFetchSingleCommissionWithdrawal(selectedRequest);

  const { mutate: approveWithdrawal, isLoading: isApproving } =
    useApproveCommissionWithdrawal();
  const { mutate: declineWithdrawal, isLoading: isDeclining } =
    useDeclineCommissionWithdrawal();

  useEffect(() => {
    if (selectedRequest) {
      queryClient.invalidateQueries(["single_commission_withdrawal"]);
    }
  }, [selectedRequest, queryClient]);

  const handleApprove = (id) => {
    approveWithdrawal(id, {
      onSuccess: () => {
        notification.success({ message: "Request Approved Successfully" });
        queryClient.invalidateQueries(["get_commission_withdrawals"]);
      },
      onError: (error) => {
        notification.error({ message: error.message || "Approval Failed" });
      },
    });
  };

  const handleDecline = () => {
    declineWithdrawal(
      { id: selectedId, reason: declineReason },
      {
        onSuccess: () => {
          notification.success({ message: "Request Declined Successfully" });
          queryClient.invalidateQueries(["get_commission_withdrawals"]);
          setDeclineModalVisible(false);
          setDeclineReason("");
        },
        onError: (error) => {
          notification.error({ message: error.message || "Decline Failed" });
        },
      }
    );
  };

  const filteredRequests = withdrawalRequests?.filter((request) =>
    request.acctName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto p-4">
      <h2>Users Commissions Withdrawal Requests</h2>
      <Input
        placeholder="Search by user name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Table
        dataSource={filteredRequests}
        rowKey="_id"
        columns={[
          { title: "User", dataIndex: "acctName", key: "user" },
          { title: "Amount", dataIndex: "amount", key: "amount" },
          { title: "Status", dataIndex: "status", key: "status" },
          // {
          //     title: "Requested At",
          //     dataIndex: "createdAt",
          //     key: "createdAt",
          //     render: (date) => new Date(date).toLocaleString(),
          // },
          // {
          //     title:"Account Number",
          //     dataIndex:"acctNumber",
          //     key:"acctNumber"
          // },

          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <>
                <Button
                  onClick={() => {
                    setSelectedRequest(record._id);
                    setModalVisible(true);
                  }}
                >
                  View
                </Button>
                {record.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleApprove(record._id)}
                      loading={isApproving}
                      style={{ marginLeft: 10 }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedId(record._id);
                        setDeclineModalVisible(true);
                      }}
                      danger
                      style={{ marginLeft: 10 }}
                    >
                      Decline
                    </Button>
                  </>
                )}
              </>
            ),
          },
        ]}
        pagination={{
          current: page,
          onChange: setPage,
          pageSize: 10,
        }}
      />

      {/* Modal for single request details */}
      <Modal
        title={
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Withdrawal Request Details
            </h3>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={500}
        className="custom-modal"
      >
        {singleRequest ? (
          <div className="p-4 space-y-4">
            {/* Status Badge */}
            <div className="text-center mb-6">
              <Tag
                color={
                  singleRequest.status === "pending"
                    ? "gold"
                    : singleRequest.status === "approved"
                    ? "success"
                    : "error"
                }
              >
                {singleRequest.status.toUpperCase()}
              </Tag>
            </div>

            {/* Details List */}
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  icon: <UserOutlined style={{ color: "#4CAF50" }} />,
                  label: "Account Name",
                  value: singleRequest.acctName,
                },
                {
                  icon: <DollarOutlined style={{ color: "#4CAF50" }} />,
                  label: "Amount",
                  value: `NGN ${singleRequest.amount.toLocaleString()}`,
                },
                {
                  icon: <BankOutlined style={{ color: "#4CAF50" }} />,
                  label: "Bank Name",
                  value: singleRequest.bankName,
                },
                {
                  icon: <CreditCardOutlined style={{ color: "#4CAF50" }} />,
                  label: "Account Number",
                  value: singleRequest.acctNumber,
                },
                {
                  icon: <ClockCircleOutlined style={{ color: "#4CAF50" }} />,
                  label: "Requested At",
                  value: new Date(singleRequest.createdAt).toLocaleString(),
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <div className="flex items-center w-full">
                    <div className="mr-3">{item.icon}</div>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500">{item.label}:</span>
                      <span className="font-medium text-gray-800">
                        {item.value}
                      </span>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div className="text-center p-4">
            <Spin size="large" />
          </div>
        )}
      </Modal>
      <Modal
        title="Decline Withdrawal Request"
        open={declineModalVisible}
        onOk={handleDecline}
        onCancel={() => setDeclineModalVisible(false)}
        confirmLoading={isDeclining}
      >
        <Input.TextArea
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          placeholder="Enter reason for declining"
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default CommissionWithdrawalRequests;
