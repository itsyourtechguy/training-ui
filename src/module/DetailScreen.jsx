import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { DateTime, ResultCard } from "asab_webui_components";
import { useTranslation } from "react-i18next";

const DetailScreen = ({ currentTenant }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toISOString = (unixSeconds) =>
    unixSeconds ? new Date(unixSeconds * 1000).toISOString() : "";

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://devtest.teskalabs.com/detail/${id}?tenant=${currentTenant}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, currentTenant]);

  if (loading) {
    return <ResultCard body={t("Loading...")} isSuccessful={true} />;
  }

  if (error) {
    return <ResultCard body={`${t("Error")}: ${error}`} isSuccessful={false} />;
  }

  if (!data) {
    return <ResultCard body={t("No data found")} isSuccessful={false} />;
  }

  return (
    <Card
      className="my-4"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      <CardHeader className="d-flex align-items-center gap-2">
        <h4 className="mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-person-lines-fill" />
          {t("User Detail")}
        </h4>
        <Button
          color="secondary"
          size="sm"
          onClick={() => navigate(-1)}
          className="ms-auto"
          style={{ flexShrink: 0 }}
          title={t("Back to list")}
        >
          <i className="bi bi-arrow-left pe-1" />
          {t("Back")}
        </Button>
      </CardHeader>
      <CardBody>
        <dl className="row">
          <dt className="col-sm-3">{t("ID")}</dt>
          <dd className="col-sm-9">{data.id}</dd>

          <dt className="col-sm-3">{t("Username")}</dt>
          <dd className="col-sm-9">{data.username}</dd>

          <dt className="col-sm-3">{t("Email")}</dt>
          <dd className="col-sm-9">{data.email}</dd>

          <dt className="col-sm-3">{t("Created At")}</dt>
          <dd className="col-sm-9">
            <DateTime value={toISOString(data.created)} dateTimeFormat="medium" />
          </dd>

          <dt className="col-sm-3">{t("Last Sign In")}</dt>
          <dd className="col-sm-9">
            <DateTime value={toISOString(data.last_sign_in)} dateTimeFormat="medium" />
          </dd>

          <dt className="col-sm-3">{t("Address")}</dt>
          <dd className="col-sm-9">{data.address}</dd>

          <dt className="col-sm-3">{t("Phone Number")}</dt>
          <dd className="col-sm-9">{data.phone_number}</dd>

          <dt className="col-sm-3">{t("IP Address")}</dt>
          <dd className="col-sm-9">{data.ip_address}</dd>

          <dt className="col-sm-3">{t("MAC Address")}</dt>
          <dd className="col-sm-9">{data.mac_address}</dd>
        </dl>
      </CardBody>
    </Card>
  );
};

export default DetailScreen;
