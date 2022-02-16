import React, { useState, useEffect } from "react";
import BankHolidayItem from "./bankHolidayItem";
import RegionItem from "./regionItem";
import YearItem from "./yearItem";
import "./css/styles.css";

export default function BankHoliday(props) {
    const currentYear = String(new Date().getFullYear());
    const [doFetch, setDoFetch] = useState(true);
    const [allBH, setAllBH] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [regions, setRegions] = useState([
        "england-and-wales",
        "scotland",
        "northern-ireland"
    ]);
    const [selectedRegion, setSelectedRegion] = useState("england-and-wales");
    const [years, setYears] = useState([
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023"
    ]);
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    useEffect(() => {
        if (doFetch) {
            setDoFetch(false);
            fetch("https://www.gov.uk/bank-holidays.json")
                .then((resp) => resp.json())
                .then((resp) => {
                    insertBankHoliday(resp);
                });
        }
    });

    function insertBankHoliday(resp) {
        for (let region of regions) {
            const days = resp[region]["events"];
            for (let day of days) {
                const newBankHoliday = {
                    region: region,
                    name: day.title,
                    date: day.date,
                    dayName: new Date(day.date).getDay(),
                    year: day.date.split("-")[0],
                    month: day.date.split("-")[1],
                    day: day.date.split("-")[2],
                    key: day.date + region
                };
                setAllBH((oldList) => [...oldList, newBankHoliday]);
            }
        }
    }

    function makeItNice(nice) {
        return nice
            .split("-")
            .map((string) =>
                string !== "and"
                    ? string[0].toUpperCase() + string.substring(1)
                    : string
            )
            .join(" ");
    }

    function makeItUgly(ugly) {
        return ugly
            .split(" ")
            .map((string) => string.toLowerCase())
            .join("-");
    }

    const bankHolidayItems = allBH
        .filter((x) => x.region === selectedRegion)
        .filter((x) => x.year === selectedYear)
        .map((x) => (
            <BankHolidayItem
                region={makeItNice(x.region)}
                name={x.name}
                date={x.date}
                dayName={dayNames[x.dayName]}
                year={x.year.substring(2)}
                month={x.month}
                day={x.day}
                key={x.key}
            />
        ));

    const regionItems = regions.map((x) => (
        <RegionItem region={makeItNice(x)} key={x} />
    ));

    const yearItems = years.map((x) =>
        x === currentYear ? (
            <YearItem year={makeItNice(x)} key={x} selected="selected" />
        ) : (
            <YearItem year={makeItNice(x)} key={x} />
        )
    );

    function handleRegionChange(e) {
        setSelectedRegion((old) => makeItUgly(e.target.value));
    }

    function handleYearChange(e) {
        setSelectedYear((old) => e.target.value);
    }

    return (
        <>
            <div className="selector-container">
                <select onChange={handleRegionChange} className="region-selector">
                    {regionItems}
                </select>
                <select onChange={handleYearChange} className="year-selector">
                    {yearItems}
                </select>
            </div>
            <ol>{bankHolidayItems}</ol>
        </>
    );
}
