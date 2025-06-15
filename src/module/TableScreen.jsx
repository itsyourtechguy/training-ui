import React from "react";
import { Link } from "react-router-dom";
import { DataTableCard2, DateTime } from "asab_webui_components";
import { useTranslation } from "react-i18next";

const TableScreen = ({ app, currentTenant }) => {
  const { t } = useTranslation();

  const toISOString = (unixSeconds) => {
    if (!unixSeconds) return "";
    return new Date(unixSeconds * 1000).toISOString();
  };

  const columns = [
    {
      title: t("Username"),
      thStyle: { minWidth: "8rem" },
      render: ({ row }) => (
        <Link to={`/detail/${row.id}`} title={`${t("ID")}: ${row.id}`}>
          {row.username}
        </Link>
      ),
    },
    {
      title: t("Email"),
      thStyle: { minWidth: "12rem" },
      render: ({ row }) => <span>{row.email}</span>,
    },
    {
      title: t("Created At"),
      thStyle: { minWidth: "8rem" },
      render: ({ row }) => (
        <DateTime value={toISOString(row.created)} dateTimeFormat="medium" />
      ),
    },
    {
      title: t("Last Sign In"),
      thStyle: { minWidth: "8rem" },
      render: ({ row }) => (
        <DateTime value={toISOString(row.last_sign_in)} dateTimeFormat="medium" />
      ),
    },
    {
      title: t("Address"),
      thStyle: { minWidth: "15rem" },
      render: ({ row }) => <span>{row.address}</span>,
    },
  ];

  const loader = async ({ params }) => {
    params["tenant"] = currentTenant;
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://devtest.teskalabs.com/data?${query}`);
    const json = await response.json();
    return {
      rows: json.data,
      count: json.count,
    };
  };

  const Header = () => (
    <div className="d-flex justify-content-between align-items-center">
      <h3>
        <i className="bi bi-people pe-2" />
        {t("Users")}
      </h3>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => alert(t("Terminate all clicked"))}
      >
        {t("Terminate all")}
      </button>
    </div>
  );

  return (
    <DataTableCard2 app={app} columns={columns} loader={loader} header={<Header />} />
  );
};

export default TableScreen;
