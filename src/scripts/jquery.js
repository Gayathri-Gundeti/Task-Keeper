$(function () {
    function LoadGetdata() {
        $("#get-data").html("Loading....");
        $.ajax({
            method: 'get',
            url: 'https://jquerytodo-i4kk.onrender.com/get-items',
            success: (response => {
                $("#get-data").html("");
                response.map(data => {
                    $(`<div class="d-flex justify-content-between " id="get-data-style" >
                        <div>
                    <span class="ms-3 text-dark">${data.Id}.</span>
                    <span class="text-dark">${data.Item}</span>
                    </div>
                    <div id="icons">
                    <button class="btn  text-dark bi bi-pen" value=${data.Id} id="btnEdit" data-bs-target="#editModal" data-bs-toggle="modal"></button>
                    <button class="btn  text-dark bi bi-trash" value=${data.Id} id="btnDelete"></button>
                    </div>
                        </div>
                    `).appendTo("#get-data");
                   

                })
            })
        })
    } LoadGetdata();         //display at time of loading

    $("#btnGet").click(() => {
        $("#add-data").html("");
        $("#input-container").html("");
        LoadGetdata();
    })
    $(document).on("click", "#btnEdit", (e) => {
        $.ajax({
            method: 'get',
            url: ` https://jquerytodo-i4kk.onrender.com/get-items/${e.target.value}`,
            success: (response => {
                $("#edit-id").val(response[0].Id);
                $("#edit-item").val(response[0].Item);

            })
        })
    })
    $("#btnSave").click(() => {
        var list = {
            Id: $("#edit-id").val(),
            Item: $("#edit-item").val()
        }
        $.ajax({
            method: 'put',
            url: ` https://jquerytodo-i4kk.onrender.com/update/${$("#edit-id").val()}`,
            data: list,
            success: () => {
                alert("Updated details successfully");
                $("#get-data").html("");
                LoadGetdata();
            }
        })
    })
    $(document).on("click", "#btnDelete", (e) => {
        var id = parseInt(e.target.value);
        var choice = confirm("Are you sure?\n Want to Delete?");
        if (choice == true) {
            $.ajax({
                method: "delete",
                url: `https://jquerytodo-i4kk.onrender.com/delete/${id}`,
                success: () => {
                    $("#get-data").html("");
                    LoadGetdata();
                }
            })
        }
    })

    $("#btnAddDetails").click(() => {
        $("#get-data").html("");
        $(`<div class="input-group" >
        <input type="text" class="form-control " placeholder="S.No" id="txtId">
        <input type="text" class="form-control w-50 " placeholder="Enter Your Task" id="txtItem">
        <button class="btn input-group-text all-red-btn"  id="input-add">ADD</button>
    </div>`).appendTo("#input-container");
    })

    function LoadAddData() {
        $.ajax({
            method: 'get',
            url: ' https://jquerytodo-i4kk.onrender.com/get-items',
            success: (response) => {
                response.map(data => {
                    $(`
                         <div class=" my-3 p-2 rounded-2" id="input-add-data">
                    <span class="ms-3">${data.Id}.</span>
                    <span >${data.Item}</span>
                    </div>
                       `).appendTo("#add-data");
                })
            }
        });
    }

    $(document).on("click", "#input-add", () => {
    var id = $("#txtId").val().trim();
    var item = $("#txtItem").val().trim();
        if (id === "" || item === "") {
            alert("Please provide both fields");
        } else {
            var list = {
                Id: $("#txtId").val(),
                Item: $("#txtItem").val(),
            };
            $.ajax({
                method: 'post',
                url: 'https://jquerytodo-i4kk.onrender.com/list-items',
                data: list,
                success: () => {

                    alert("Details Added..")
                    $("#add-data").html("");
                    $("#txtId").val("");
                    $("#txtItem").val("");
                    LoadAddData();

                }

            })
        }

    })
})
