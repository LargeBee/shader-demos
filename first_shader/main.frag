/*
Used Part 1 and 2 of the tutorial by the art of code
https://www.youtube.com/watch?v=u5HAYVHsasc
https://www.youtube.com/watch?v=GgGBR4z8C9o

and borrowed some code from this shader
https://www.shadertoy.com/view/XsGfWw
*/

float Circle (vec2 uv, vec2 p, float r, float blur)
{
    float d = length(uv - p);
    float c = smoothstep(r, r - blur, d);

    return c;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //Normalize coordinates to values 0 -> 1
    vec2 uv = fragCoord/iResolution.xy; //0 -> 1

    //Map centre to origin
    uv -= 0.5;                           //-0.5 -> 0.5

    //Multiply uv.x by aspect ratio of screen
    uv.x *= iResolution.x/iResolution.y;

    float c = Circle(uv, vec2(0, 0), 0.4, 0.05);

    float speed = 1.0;
    float rotDist = 4.0;
    vec2 pos = vec2(sin(iTime * speed) / rotDist, cos(iTime * speed) / rotDist);
    c -= Circle(uv, pos, 0.1, 0.01);

    //Output colour per pixel
    fragColor = vec4(vec3(c), 1.0);
}