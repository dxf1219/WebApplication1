if (!jQuery) throw new Error("isRock framework requires jQuery.");
function CallPageMethod(methodName, para, onSuccess, onFail)
{
    if (para == null) para = {};
    if (onSuccess == undefined)
        onSuccess = _CallPageMethod_Success;
    if (onFail == undefined)
        onFail = _CallPageMethod_Fail;
    var loc = window.location.href;
    loc = loc.substr(loc.length - 1, 1) == "/" ? loc + "default.aspx" : loc;
    if (loc.indexOf("#") != -1)
        loc = loc.substr(0, loc.indexOf("#"));
    if (loc.indexOf("?") != -1)
        loc = loc.substr(0, loc.indexOf("?"));
    $.ajax({
        type: "POST",
        url: loc + "/" + methodName,
        data: JSON.stringify(para),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:
            function (response)
            { onSuccess(response.d) },
        failure: function (response)
        { onFail(response) }
    }).fail(function (response)
    {
        if (response.status == 299)
        {
            var ex = {
                "responseJSON":
                    { "Message": response.responseText }
            }; onFail(ex)
        }
        else onFail(response)
    })
}

function _CallPageMethod_Success(result)
{
    console.log("_CallPageMethod_Success Success return : " + result, result);
    alert("ExecuteCommand Success.")
}

function _CallPageMethod_Fail(ex)
{
    console.log("_CallPageMethod_Fail error : " + ex.statusText, ex);
    alert("error : " + ex.statusText)
}

function ExecuteAPI(catalog, method, para, success, fail)
{
    $.ajax({
        url: "/api/" + catalog + "/" + method,
        type: "post",
        contentType: "application/json",
        beforeSend: function (xhr) {
            if (typeof __ExecuteAPIToken !== "undefined")
                xhr.setRequestHeader("Authorization", "Bearer " + __ExecuteAPIToken)
        },
        data: JSON.stringify(para),
        success: function (apiResult) {
            if (!success) _ExecuteAPIonSuccess(apiResult);
            else success(apiResult)
        },
        error: function (ex) {
            if (!fail) _ExecuteAPIonError(ex);
            else fail(ex)
        }
    })
}

function _ExecuteAPIonSuccess(apiResult)
{
    if (apiResult.isSuccess) alert("\u6210\u529f");
    else alert("\u5931\u6557 : " + apiResult.Message)
}

function _ExecuteAPIonError(ex)
{
    alert("\u5931\u6557\uff0c\u8acb\u6280\u8853\u54e1\u67e5\u770bex\u7269\u4ef6 : " + ex)
};