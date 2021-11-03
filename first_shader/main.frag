void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //Normalize coordinates to values 0 -> 1
    vec2 uv = fragCoord/iResolution.xy; //0 -> 1

    //Map centre to origin
    uv -= .5;                           //-0.5 -> 0.5

    //Multiply uv.x by aspect ratio of screen
    uv.x *= iResolution.x/iResolution.y;

    float d = length(uv);
    float c = d;

    if(d < .3) c = 1.; else c = 0.;

    fragColor = vec4(vec3(c), 1.0);
}