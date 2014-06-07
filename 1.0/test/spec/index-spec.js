KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('ghostscroll', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/ghostscroll/1.0/']});