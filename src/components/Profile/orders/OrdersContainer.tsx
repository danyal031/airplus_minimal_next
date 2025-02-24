"use client";
import OrderListProgress from "@/components/Skelton-Components/profile/orderList/OrderListProgress";
import { OrderDataType } from "@/DataTypes/orders/orderTypes";
import { getOrderList } from "@/global-files/axioses";
import { formatInputWithCommas } from "@/global-files/function";
import { Button, Chip, Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import LuggageIcon from "@mui/icons-material/Luggage";
const OrdersContainer = () => {
  // initial states
  const [orderList, setOrderList] = useState<OrderDataType[] | []>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const router = useRouter();

  // handle get order list
  useEffect(() => {
    setShowLoading(true);
    getOrderList()
      .then((res: any) => {
        if (res.status) {
          setShowLoading(false);
          setOrderList(res.data);
        }
      })
      .catch((err) => {
        if (err.status === 511) {
          // handleLogout();
          // setOpenLoginDialog(true);
          setShowLoading(false);
          router.push("/");
        }
      });
  }, []);

  // render Travel statistics
  const renderTravelStatistics = () => {
    return (
      <>
        <div className="border-2 border-main rounded-full grid grid-cols-3 min-h-14 overflow-hidden">
          <div className="col-span-1 grid grid-cols-12 gap-2">
            <div className="col-span-2 rounded-full border-l-4 border-main h-full w-full"></div>
            <div className="col-span-10 flex items-center justify-start">
              <span className="text-text-main text-sm font-bold">
                تحلیل سفر توسط Helpix
              </span>
            </div>
          </div>
          <div className="h-full col-span-2 bg-main rounded-r-full grid grid-cols-3 gap-2">
            <div className="flex items-center justify-start gap-2">
              <span className="h-14 w-14 rounded-full bg-paper border-2 border-main flex items-center justify-center">
                <LuggageIcon color="primary" />
              </span>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-base text-text-main font-bold">15</span>
                <span className="text-sm font-semibold text-text-main">
                  تعداد سفرها{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="h-14 w-14 rounded-full bg-paper flex items-center justify-center">
                <LuggageIcon color="primary" />
              </span>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-base text-text-main font-bold">15</span>
                <span className="text-sm font-semibold text-text-main">
                  سفرهای داخلی{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="h-14 w-14 rounded-full bg-paper flex items-center justify-center">
                <LuggageIcon color="primary" />
              </span>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-base text-text-main font-bold">15</span>
                <span className="text-sm font-semibold text-text-main">
                  سفرهای خارجی{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // render orders search box
  const renderOrdersSearchBox = () => {
    return (
      <>
        <div className="p-5 border border-divider rounded-2xl grid grid-cols-11 gap-2">
          <TextField
            label="جستجوی سفر"
            size="small"
            placeholder="شماره سفارش سفر"
            className="col-span-3"
          />
          <TextField label="نوع سفر" size="small" className="col-span-3" />
          <div className="col-span-3 flex items-center justify-center gap-0">
            <TextField
              label="تاریخ ثبت سفر"
              size="small"
              placeholder="از"
              className="w-full"
              focused
            />
            <TextField
              size="small"
              placeholder="تا"
              className="w-full border-r-0"
            />
          </div>
          <Button
            className="col-span-2 rounded-lg"
            variant="contained"
            size="small"
          >
            جستجو
          </Button>
        </div>
      </>
    );
  };

  // render orders
  const renderOrders = () => {
    return (
      <>
        {showLoading ? (
          <OrderListProgress />
        ) : orderList.length === 0 ? (
          <span className="text-text-main text-base">سفری وجود ندارد</span>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {orderList.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-paper p-8 rounded-2xl w-full grid grid-cols-1 gap-3">
      {/* render Travel statistics */}
      {renderTravelStatistics()}

      {/* render orders search box */}
      {renderOrdersSearchBox()}

      {/* render orders */}
      {renderOrders()}
    </div>
  );
};

export default OrdersContainer;

interface OrderCardProps {
  order: OrderDataType;
}
const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <>
      <div className="p-3 pb-0 border border-divider grid grid-cols-1 gap-2 min-h-48 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-text-main font-semibold text-sm">پرواز</span>
          <Chip
            variant="outlined"
            size="small"
            className="text-sm"
            color={
              order.details?.financial?.balance_received === 0
                ? "success"
                : "error"
            }
            label={
              order.details?.financial?.balance_received === 0
                ? "تسویه شده"
                : "تسویه نشده"
            }
          />
        </div>
        <Divider variant="fullWidth" />
        <div className="grid grid-cols-1 gap-3 font-semibold">
          <div className="flex items-center justify-between">
            <span className="text-text-main text-sm">شماره سفارش</span>{" "}
            <span className="text-text-main text-sm">
              {order.details?.serial_id}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-main text-sm">مبلغ پرداخت شده</span>{" "}
            <span className="text-text-main text-sm">
              {formatInputWithCommas(
                ((order.details?.financial?.sum_sale ?? 0) -
                  (order.details?.financial?.sum_return_sale ?? 0)) /
                  10
              )}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-center">
          <span className="rounded-tab-down-sm min-w-36 h-8 bg-divider text-text-main text-sm flex items-center justify-center">
            جزئیات
          </span>
        </div>
      </div>
    </>
  );
};
