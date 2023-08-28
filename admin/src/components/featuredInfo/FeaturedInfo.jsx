import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../network/network";
import { useState, useEffect } from "react";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);
  const [sale, setSale] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setIncome(res.data);
        const currentMonthTotal = res.data[1]?.total;
        const lastMonthTotal = res.data[0]?.total;
        
        if (currentMonthTotal && lastMonthTotal) {
          setPercent((currentMonthTotal * 100) / lastMonthTotal - 100);
          setSale(((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getIncome();
  }, []);
  console.log(income );
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {income[0]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(percent)}
            {percent < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(sale)}
            {sale < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
