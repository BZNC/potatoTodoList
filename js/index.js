$(function () {
    load()

    //1 从localstorage读取数据的方法
    function readData() {
        var todoList = localStorage.getItem("todo")
        if (todoList !== null) {
            return JSON.parse(todoList)
        } else {
            return []
        }
    }

    //2 向localstorage写入数据的方法
    function writeData(data) {
        localStorage.setItem("todo", JSON.stringify(data))
    }

    //3 渲染数据的方法
    function load() {
        let data = readData()
        $('ol,ul').empty()
        let olNum = 0
        let ulNum = 0

        $.each(data, function (i, n) {
            let doneTempStr =
                `<li>
                        <input type="checkbox" checked>
                        <p>${n.title}</p> <a href="javascript:;" id=${i}></a>
                 </li>        
            `
            let todoTempStr =
                `<li>
                        <input type="checkbox">
                        <p>${n.title}</p> <a href="javascript:;" id=${i}></a>
                 </li>        
            `
            if (n.done) {
                $('ul').prepend(doneTempStr)
                ulNum++
            }
            else {
                $('ol').prepend(todoTempStr)
                olNum++
            }
        })
        $('#todocount').text(olNum)
        $('#donecount').text(ulNum)
    }

    // 4 添加todo的方法
   $("#title").on("keyup", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入todo内容");
            } else {
                let local = readData();
                local.push({ title: $(this).val(), done: false });
                writeData(local);
                load();
                $(this).val("");
            }
        }
    });

    //5 删除list的方法
    $("ul,ol").on("click", "a", function () {
        console.log($(this))
        let data = readData()
        let index = $(this).attr('id')
        data.splice(index, 1)
        writeData(data)
        load()
    })

    //6 修改todo状态的方法
    $("ul,ol").on("click",'input',function(){
        //获取自定义属性id
        let index = $(this).siblings('a').attr('id')
        let data = readData()
        //获取属性checked
        data[index].done=$(this).prop('checked')
        writeData(data)
        load()
    })

})
