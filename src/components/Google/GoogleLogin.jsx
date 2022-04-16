import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGoogleData } from "../../redux/auth/authSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GoogleLogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (location.search !== "") {
      const paramMap = {};
      location.search
        .substring(location.search.indexOf("?") + 1)
        .split("&")
        .forEach(function(val) {
          var param = val.split("=");
          paramMap[param[0]] = param[1];
        });

      const accessToken = decodeURI(paramMap.accessToken);
      const refreshToken = paramMap.refreshToken;
      const sid = paramMap.sid;

      dispatch(setGoogleData({ accessToken, refreshToken, sid }));
      history.push("/library");
    }
  }, [location]);
};

export default GoogleLogin;
