import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppLayout } from "./appLayout";
import { IntlProvider } from "react-intl-hooks";
import locale_en from "./languageFiles/en.json";
import locale_lt from "./languageFiles/lt.json";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { IRootState } from "./reducers/CombinedReducer";

const translatedMessages: any = {
  en: locale_en,
  lt: locale_lt,
};

function App() {
  const { language } = useSelector((state: IRootState) => state.languageData);

  return (
    <IntlProvider locale={language} messages={translatedMessages[language]} defaultLocale="en">
      <Router>
        <AppLayout />
      </Router>
    </IntlProvider>
  );
}

export default App;
