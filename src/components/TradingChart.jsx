import React, { useEffect, useRef } from "react";

const TradingViewChart = () => {
  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tradingview_btc_chart",
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        hide_top_toolbar: false,
        hide_legend: false,
      });
    };
    container.current.appendChild(script);
  }, []);

  return (
    <div
      id="tradingview_btc_chart"
      ref={container}
      style={{ height: "600px", width: "100%" }}
    />
  );
};

export default TradingViewChart;
