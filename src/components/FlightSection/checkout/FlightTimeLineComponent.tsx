"use client";
import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { styled } from "@mui/material/styles";

const FlightTimeLineComponent = () => {
  // initial states
  const theme = useTheme();
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 15,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor: "#dedede70",
      borderRadius: 1,
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
  }));

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      ownerState.active || ownerState.completed
        ? theme.palette.background.paper // رنگ پس‌زمینه در حالت فعال یا تکمیل‌شده
        : "#dedede50",
    zIndex: 1,
    color:
      ownerState.active || ownerState.completed
        ? theme.palette.primary.main // رنگ آیکون در حالت فعال یا تکمیل‌شده
        : theme.palette.background.paper,
    width: 33,
    height: 33,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0,0,0,.25)" : "none", // سایه در حالت فعال
    ...theme.applyStyles("dark", {
      backgroundColor:
        ownerState.active || ownerState.completed
          ? theme.palette.primary.dark
          : theme.palette.grey[700],
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
      1: <CheckCircleOutlineIcon />,
      2: <GroupIcon />,
      3: <PaymentIcon />,
      4: <InsertDriveFileIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const steps = ["انتخاب پرواز", "اطلاعات مسافران", "پرداخت", "صدور و پیگیری"];
  return (
    <div className="bg-primary-main p-2 px-2 md:px-5 rounded-b-xl">
      <Stepper
        activeStep={1}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          labelProps.optional = (
            <Typography
              className="mt-2 text-xs md:text-sm truncate"
              color={theme.palette.background.paper}
            >
              {label}
            </Typography>
          );
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps} />
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default FlightTimeLineComponent;
{
  /* <ColorlibStepLabel
              StepIconComponent={ColorlibStepIcon}
              ownerState={{
                active: index === 1, // تعیین فعال بودن
                completed: index < 1, // تعیین تکمیل‌شده بودن
              }}
            >
              {label}
            </ColorlibStepLabel> */
}
