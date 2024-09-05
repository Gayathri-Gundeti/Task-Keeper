$(function () {
    function LoadGetdata() {
        $.ajax({
            method: 'get',
            url: 'https://to-do-list-1-psys.onrender.com/get-items',
            success: (response => {
                response.map(data => {
                    $(`<div class="d-flex justify-content-between " id="get-data-style" >
                        <div>
                    <span class="ms-3 text-dark">${data.Id}.</span>
                    <span class="text-dark">${data.Item}</span>
                    </div>
                    <div>
                    <button class="btn  text-dark bi bi-pen" value=${data.Id} id="btnEdit" data-bs-target="#editModal" data-bs-toggle="modal"></button>
                    <button class="btn  text-dark bi bi-trash" value=${data.Id} id="btnDelete"></button>
                    </div>
                        </div>
                    `).appendTo("#get-data");

                })
            })
        })
    }LoadGetdata();         //display at time of loading

  $("#btnGet").click(() => {
        $("#add-data").html("");
        $("#input-container").html("");
        LoadGetdata();
    })
    $(document).on("click", "#btnEdit", (e) => {
        $.ajax({
            method: 'get',
            url: ` http://127.0.0.1:7700/get-items/${e.target.value}`,
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
            url:` http://127.0.0.1:7700/update/${$("#edit-id").val()}`,
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
                url: ` http://127.0.0.1:7700/delete/${id}`,
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
        <input type="text" class="form-control " placeholder="Enter Id" id="txtId">
        <input type="text" class="form-control w-50 " placeholder="Enter Your Data" id="txtItem">
        <button class="btn btn-danger input-group-text"  id="input-add">ADD</button>
    </div>`).appendTo("#input-container");
    })

   function LoadAddData() {
        $.ajax({
            method: 'get',
            url: ' http://127.0.0.1:7700/get-items',
            success: (response) => {
                response.map(data => {
                    $(`
                         <div class="bg-danger text-white my-3 p-2 rounded-2">
                    <span class="ms-3">${data.Id}.</span>
                    <span >${data.Item}</span>
                    </div>
                       `).appendTo("#add-data");
                })
            }
        });
    }

    $(document).on("click", "#input-add", () => {
        var list = {
            Id: $("#txtId").val(),
            Item: $("#txtItem").val(),
        };
        $.ajax({
            method: 'post',
            url: ' http://127.0.0.1:7700/list-items',
            data: list,
            success: () => {
                alert("Details Added..")
                $("#add-data").html("");
                LoadAddData();
            }

        })
    })
})
