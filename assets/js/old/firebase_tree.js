$(function() {

    var firebaseRef = new Firebase("https://amber-fire-55.firebaseio.com/");

    // A MESSAGES REFERENCE UNDER MAIN DB
    var rootRef = firebaseRef.child("adminApp1");

    // delete record when a tag is clicked
    jQuery('body').on('click', 'a', function() {
       var $rec = $(this).closest('[data-id]');
       console.log($rec);
        var id = $rec.attr('data-id') || null;
        console.log(id);
        if( id ) {
           // remove any nested children
           $rec.find('[data-id]').each(function() {
              rootRef.child($(this).attr('data-id')).remove(); 
           });
           
           // remove the record
           rootRef.child(id).remove();
        }
        return false;
    });

    // add new records at the appropriate level when a button is clicked
    jQuery('body').on('click', 'button', function () {
        var $input = $(this).prev('input');
        var title = $input.val();
        var parent = $input.closest('[data-id]').attr('data-id') || null;
        console.log('creating', parent, title);
        if (title) {
            rootRef.push({ 'title': title, 'parent': parent });
        }
        $input.val('');
        return false;
    })

    rootRef.on('child_added', function (snapshot) {
        var message = snapshot.val();
        console.log('child_added', message);
        displayTitleMessage(snapshot.name(), message.title, message.parent);
    });

    rootRef.on('child_removed', function(snapshot) {
        $('#records').find('[data-id="'+snapshot.name()+'"]').remove();
    });

});

function displayTitleMessage(id, title, parentId) {
    var $parent = parentId ? findParent(parentId) : $('#records');
    var $el = makeListItem(title);
    console.log('displaying', id, parentId, $parent, title);
    // add a data-parent attribute, which we use to locate parent elements
    $el.appendTo($parent).attr('data-id', id);
}

function findParent(parentId) {
    return $('#records').find('[data-id="' + parentId + '"] > ul');
}

function makeListItem(title) {
    return $('#recordTemplate').clone()
    // remove the id attr
    .attr('id', null)
    // enter the <span> tag and use .text() to escape title
    .find('span').text(title)
    // navigate back to the cloned element and return it
    .end();
}

