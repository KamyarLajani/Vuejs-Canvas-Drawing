<template>
    <div class="container">
        
        <canvas width="700" height="500" ref="canvas" :class="{pen: pen, eraser: clean}" @mousedown="mouseDown()" @mouseup="mouseUp()" @mousemove="mouseMove($event)"></canvas>
        <div class="tools">
            <div>
                <img @click="penSizeShow = !penSizeShow; pen = true; clean = false" src="/images/pencil.png" alt="Pen" title="Pen" />
                <div v-show="penSizeShow">
                    <input type="number" v-model="penSize" min="1" max="50"/>
                </div>
            </div>
            <div>
                <img @click="clean = !clean; penSizeShow = false, pen = false" src="/images/eraser.png" alt="eraser" title="Cleaner"/>
                <div v-show="clean" title="Cleaner">
                    <input type="number" v-model="cleanSize" min="1" max="50"/>
                </div>
            </div>

                <div>
                    <input type="color" v-model="color" title="Color">
                </div>
            
                <div>
                    <button @click="clear()">Reset All</button>
                </div>
           
                <div>
                    <button @click="save = !save">Save</button>
                    <div v-if="save">
                        <select v-model="imageType">
                            <option value="image/png">PNG</option>
                            <option value="image/jpeg">JPG</option>
                        </select>
                        <a :href="dataUrl" @click="saving()" download>Download</a>
                    </div>
                </div>
       
        </div>
        
    </div>
</template>

<script>
var ctx,canvas;

export default {

    // declaring canvas element
    mounted() {
        canvas =  this.$refs.canvas;
        ctx = canvas.getContext('2d');
    },
    data() {
        return {
            x: 0,
            y: 0,
            mDown: false,
            pen : true,
            penSizeShow: false,
            penSize: 5,
            clean: false,
            cleanSize: 20,
            color: 'black',
            save: false,
            imageType: 'image/png',
            dataUrl: ''
           
        }
    },
    methods: {
       
        mouseDown: function() {
            this.mDown = true;
            ctx.beginPath();
            ctx.lineWidth = this.penSize;
            ctx.strokeStyle = this.color;
            this.x  = e.offsetX;
            this.y  = e.offsetY;
            ctx.moveTo(this.x,this.y);
       
        },

        mouseUp: function() {
            this.mDown = false
            
        },
         
        mouseMove: function(e) {
        // Mouse down should be fire before mouse move
           if(this.mDown){
                this.x  = e.offsetX;
                this.y  = e.offsetY;

                if(this.clean) {
                
                ctx.clearRect(this.x, this.y,  this.cleanSize, this.cleanSize);
                
                }
                else {
                    ctx.lineTo(this.x,this.y);   
                    ctx.stroke();
                }
           }
           
        },
        // reset all
        clear: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        // canvas to Data URL (base64) then adding it in href of download button to be downloadable with base64
        saving: function(){
            this.dataUrl = canvas.toDataURL(this.imageType);
            console.log(this.dataUrl);
        }
    }
}
</script>
