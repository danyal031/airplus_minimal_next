import { useTheme, useMediaQuery } from "@mui/material";

const useResponsive = () => {
  //   const theme = useTheme();

  //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery("(min-width:768px)");
  //   const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return {
    // isMobile,
    // isTablet,
    isDesktop,
    // isLargeDesktop,
  };
};

export default useResponsive;
