using isRock.Framework;
using isRock.Framework.WebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.BO
{
    public class Health : BusinessLogicBase
    {
        /// <summary>
        /// 計算BMI
        /// </summary>
        /// <param name="bodyInfo"></param>
        /// <returns></returns>
        public ExecuteCommandDefaultResult BMI(BodyInfo bodyInfo)
        {
            float height = (bodyInfo.height) / 100;
            var bmi = bodyInfo.weight / (height * height);
            return new ExecuteCommandDefaultResult() { Data = bmi, isSuccess = true };
        }

        public ExecuteCommandDefaultResult CalDate(DateInfo dateinfo)
        {
            try
            {
                DateTime dtfrom = Convert.ToDateTime(dateinfo.nowdate);
                var dtto = dtfrom.AddDays(29).ToString("yyyy-MM-dd");
                return new ExecuteCommandDefaultResult() { Data = dtto, isSuccess = true };
            }
            catch (Exception ee)
            {
                return new ExecuteCommandDefaultResult() { Data = "异常:"+ee.ToString(), isSuccess = false };
            }

        }
    }
    public class DateInfo
    {
        public string nowdate { get; set; }
    }
    /// <summary>
    /// 個人身高體重
    /// </summary>
    public class BodyInfo
    {
        public float height { get; set; }
        public float weight { get; set; }
    }
}