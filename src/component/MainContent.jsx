// ========== الاستيرادات ==========
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-kw";

// MUI Components
import {
  Grid,
  Divider,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

// الصور
import elFagrImg from "./images/el-fagr.jpg";
import elDuhrImg from "./images/الظهر.jpg";
import elAsrImg from "./images/العصر.jpg";
import elMaghribImg from "./images/المغرب.jpg";
import elIshaImg from "./images/العشاء.jpg";

// مكون كارت الصلاة
function Prayer({ name, image, time }) {
  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        width: "200px",
        height: "220px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.15)",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        margin: "auto",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "130px",
          objectFit: "cover",
          borderRadius: "12px 12px 0 0",
        }}
      />
      <h3 style={{ margin: "8px 0 0 0" }}>{name}</h3>
      <p style={{ margin: "0 0 8px 0" }}>{time}</p>
    </div>
  );
}

// ========== المكون الرئيسي ==========
export default function MainContent() {
  // حالات الصلاة، المدينة، التاريخ، والعداد
  const [timings, setTimings] = useState({
    Fajr: "04:10",
    Dhuhr: "12:30",
    Asr: "15:30",
    Maghrib: "18:50",
    Isha: "20:10",
  });

  const [selectedCity, setSelectedCity] = useState({
    displayName: "الرياض",
    apiName: "Riyadh",
  });

  const [currentDate, setCurrentDate] = useState("");
  const [timer, setTimer] = useState("");
  const [nextPrayer, setNextPrayer] = useState({ name: "", time: "" });

  const availableCities = [
    { displayName: "مكة", apiName: "Makkah" },
    { displayName: "المدينة المنورة", apiName: "Medina" },
    { displayName: "الرياض", apiName: "Riyadh" },
    { displayName: "جدة", apiName: "Jeddah" },
    { displayName: "الدمام", apiName: "Dammam" },
    { displayName: "أبها", apiName: "Abha" },
    { displayName: "تبوك", apiName: "Tabuk" },
    { displayName: "حائل", apiName: "Hail" },
  ];

  // جلب مواقيت الصلاة
  const getTimings = async (city = "Riyadh") => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=SA&method=8`
    );
    setTimings(response.data.data.timings);
  };

  // عند تغيير المدينة
  useEffect(() => {
    moment.locale("ar-kw");
    getTimings(selectedCity.apiName);
    setCurrentDate(moment().format("LLLL"));
  }, [selectedCity]);

  // إعداد عداد العصر
  useEffect(() => {
    const interval = setInterval(setupCountdown, 1000);
    setupCountdown();
    return () => clearInterval(interval);
  }, [timings]);

  // دالة حساب الوقت المتبقي للصلاة القادمة
  const setupCountdown = () => {
    const now = moment();
    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha },
    ];

    // تحويل جميع أوقات الصلاة إلى لحظات
    const prayerMoments = prayers.map((prayer) => ({
      name: prayer.name,
      moment: moment(prayer.time, "HH:mm"),
    }));

    // إذا كان الوقت الحالي بعد العشاء، نضيف يوم للفجر
    if (now.isAfter(prayerMoments[4].moment)) {
      prayerMoments[0].moment.add(1, "day");
    }

    // إيجاد الصلاة القادمة
    const nextPrayerMoment =
      prayerMoments.find((prayer) => prayer.moment.isAfter(now)) ||
      prayerMoments[0];

    // حساب الفرق
    const diff = moment.duration(nextPrayerMoment.moment.diff(now));
    const h = String(diff.hours()).padStart(2, "0");
    const m = String(diff.minutes()).padStart(2, "0");
    const s = String(diff.seconds()).padStart(2, "0");

    setTimer(`${h}:${m}:${s}`);
    setNextPrayer({
      name: nextPrayerMoment.name,
      time: nextPrayerMoment.moment.format("HH:mm"),
    });
  };

  // عند اختيار مدينة من القائمة
  const handleCityChange = (event) => {
    const apiName = event.target.value;
    const city = availableCities.find((c) => c.apiName === apiName);
    setSelectedCity(city);
  };

  // تحويل التوقيت من 24 إلى 12 ساعة
  const to12Hour = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    let hour = parseInt(h, 10);
    hour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour}:${m}`;
  };

  // ========== واجهة المستخدم ==========
  return (
    <div
      style={{
        padding: "20px",
        direction: "rtl",
        color: "white",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      {/* العنوان والعداد */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid columns={6}>
          <div className="city">
            <h2>{currentDate}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid columns={6}>
          <div>
            <h2>متبقي حتى صلاة {nextPrayer.name}</h2>
            <h1>{timer}</h1>
          </div>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "white", marginTop: "20px" }} />

      {/* بطاقات الصلاة */}
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "20px",
          maxWidth: "1200px",
          margin: "20px auto",
          flexWrap: "nowrap",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={2.4}>
          <Prayer
            name="الفجر"
            image={elFagrImg}
            time={to12Hour(timings.Fajr)}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Prayer
            name="الظهر"
            image={elDuhrImg}
            time={to12Hour(timings.Dhuhr)}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Prayer name="العصر" image={elAsrImg} time={to12Hour(timings.Asr)} />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Prayer
            name="المغرب"
            image={elMaghribImg}
            time={to12Hour(timings.Maghrib)}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Prayer
            name="العشاء"
            image={elIshaImg}
            time={to12Hour(timings.Isha)}
          />
        </Grid>
      </Grid>

      {/* اختيار المدينة */}
      <Stack direction="row" sx={{ marginTop: "20px" }} justifyContent="center">
        <FormControl sx={{ width: 200 }}>
          <InputLabel
            id="select-city-label"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            المدينة
          </InputLabel>
          <Select
            sx={{ color: "white", padding: "5px" }}
            labelId="select-city-label"
            id="select-city"
            onChange={handleCityChange}
          >
            {availableCities.map((city) => (
              <MenuItem key={city.apiName} value={city.apiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
